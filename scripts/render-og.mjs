import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

import puppeteer from "puppeteer";
import sharp from "sharp";

const ROOT_DIR = path.resolve(process.cwd());
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const ASSET_DIR = path.join(PUBLIC_DIR, "assests");
const FONT_DIR = path.join(PUBLIC_DIR, "fonts");

const WIDTH = 1200;
const HEIGHT = 630;

const fontUrl = (file) => pathToFileURL(path.join(FONT_DIR, file)).toString();
/**
 * Inlined, not linked: setContent leaves the document on about:blank, and
 * Chrome refuses to load file:// subresources from there.
 */
const inlineAvatar = async (px) => {
  const buffer = await sharp(path.join(ASSET_DIR, "avatar.png"))
    .resize(px, px)
    .png()
    .toBuffer();

  return `data:image/png;base64,${buffer.toString("base64")}`;
};

/** Same tokens as styles/globals.css and public/doc.css. */
const shell = (body) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "IBM Plex Sans"; font-weight: 600; font-display: block;
    src: url("${fontUrl("ibm-plex-sans-latin-600-normal.woff2")}") format("woff2"); }
  @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block;
    src: url("${fontUrl("ibm-plex-mono-latin-500-normal.woff2")}") format("woff2"); }

  * { box-sizing: border-box; margin: 0; }

  body {
    width: ${WIDTH}px; height: ${HEIGHT}px;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 64px 72px;
    background-color: #f2f1ec;
    background-image:
      linear-gradient(to right, rgba(20,21,19,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(20,21,19,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    color: #4a4d46;
    font-family: "IBM Plex Sans", sans-serif;
  }

  .label {
    font-family: "IBM Plex Mono", monospace; font-weight: 500;
    font-size: 17px; letter-spacing: 0.12em; text-transform: uppercase;
  }

  .masthead {
    display: flex; align-items: center; gap: 14px;
    padding-bottom: 18px; border-bottom: 1px solid #141513; color: #141513;
  }

  .dot { width: 10px; height: 10px; background: #b4331d; }

  h1 {
    color: #141513; font-size: 78px; font-weight: 600;
    letter-spacing: -0.035em; line-height: 0.95;
  }

  .foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }
  .foot .label { color: #666962; }

  .row { display: flex; align-items: center; gap: 56px; }
  .col { flex: 1; min-width: 0; }

  figure { width: 240px; flex: none; }
  figure .frame { width: 240px; height: 240px; border: 1px solid #cdc9bd; background: #e9e7df; }
  figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
  figcaption { margin-top: 12px; color: #666962; font-size: 15px; white-space: nowrap; }
</style></head><body>${body}</body></html>`;

const avatar = await inlineAvatar(480);

const cards = [
  {
    output: "og-image.png",
    html: shell(`
      <div class="masthead"><span class="dot"></span><span class="label">cardin.nguyen.ink</span></div>
      <div class="row">
        <div class="col"><h1>I build backends, then take them apart.</h1></div>
        <figure>
          <div class="frame"><img src="${avatar}" alt=""></div>
          <figcaption class="label">Fig. 00 / Cardin Nguyen</figcaption>
        </figure>
      </div>
      <div class="foot">
        <span class="label">Backend developer / Cybersecurity student</span>
        <span class="label">West Linn, Oregon</span>
      </div>`),
  },
  {
    output: "og-nguyen.png",
    html: shell(`
      <div class="masthead"><span class="dot"></span><span class="label">nguyen.ink / index</span></div>
      <div class="row"><div class="col"><h1>Two people, one domain.</h1></div></div>
      <div class="foot">
        <span class="label">cardin.nguyen.ink</span>
        <span class="label">dylan.nguyen.ink</span>
      </div>`),
  },
];

/*
 * The site's own mark is a hairline square holding "CN" in Plex Mono. That
 * reads at 28px in the masthead but not at 16px in a tab strip, where a 1px
 * rule disappears and an unfilled ground is whatever colour the browser chrome
 * happens to be. So the favicon keeps the letterforms and inverts the
 * construction: oxide ground, paper letters, no border to lose.
 *
 * Two glyphs still cannot hold up at 16px -- the counters fill in and "CN"
 * turns to mush -- so each mark also renders a single-letter cut used for the
 * 16px slot only. Standard-DPI tabs get that; everything else gets the pair.
 *
 * One mark per host. Dylan's site wearing Cardin's initials would be worse
 * than the Vercel triangle these replace.
 */
const MARK_PX = 512;

/*
 * Pastel pink ground, deep plum letters. The pair is 9.6:1, which the glyphs
 * need: at 16px a monogram is a handful of pixels, and a soft-on-soft pastel
 * pairing would dissolve into a blank chip.
 */
const MARK_GROUND = "#f5c6d9";
const MARK_INK = "#3d2130";

const marks = [
  { slug: "cn", text: "CN", small: "C" },
  { slug: "dn", text: "DN", small: "D" },
  { slug: "n", text: "N", small: "N" },
];

/*
 * Glyphs only, on a transparent ground. Centring happens after the render,
 * against the real ink bounding box -- em-based nudges cannot account for
 * side bearings, and got the two-letter marks 5px off.
 *
 * `stroke` synthesises a heavier weight for the 16px cut. Downsampling 512 to
 * 16 leaves a ~1px stem, which reads washed out; widening the glyph outline by
 * 14px first lands it nearer 1.5px. Plex Mono ships no weight above 500 here.
 */
const markHtml = (text, stroke = 0) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "IBM Plex Mono"; font-weight: 500; font-display: block;
    src: url("${fontUrl("ibm-plex-mono-latin-500-normal.woff2")}") format("woff2"); }

  html, body { margin: 0; background: transparent; }

  .mark {
    width: ${MARK_PX}px; height: ${MARK_PX}px;
    display: flex; align-items: center; justify-content: center;
    color: ${MARK_INK};
    font-family: "IBM Plex Mono", monospace; font-weight: 500;
    font-size: 320px; line-height: 1; letter-spacing: -0.04em;
    -webkit-text-stroke: ${stroke}px ${MARK_INK};
    paint-order: stroke fill;
  }
</style></head>
<body><div class="mark">${text}</div></body></html>`;

/**
 * Trims the render to its ink, scales that to fill the given fraction of the
 * tile, and composites it dead centre on the pink ground. Because the input is
 * the trimmed bounding box, "centre" here is the letterforms themselves rather
 * than the line box they happened to sit in.
 */
async function composeMark(glyphPng, { widthFrac, heightFrac }) {
  const trimmed = await sharp(glyphPng).trim({ threshold: 8 }).toBuffer();

  const fitted = await sharp(trimmed)
    .resize({
      width: Math.round(MARK_PX * widthFrac),
      height: Math.round(MARK_PX * heightFrac),
      fit: "inside",
    })
    .toBuffer();

  return sharp({
    create: {
      width: MARK_PX,
      height: MARK_PX,
      channels: 4,
      background: MARK_GROUND,
    },
  })
    .composite([{ input: fitted, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 2,
    });

    for (const card of cards) {
      // "load" rather than networkidle0: the second card issues no requests at
      // all once the fonts are cached, and the idle watcher never settles.
      await page.setContent(card.html, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );

      const raw = await page.screenshot({ type: "png" });

      // Rendered at 2x for crisp type, then written back at the 1200x630 that
      // Open Graph actually wants, and palette-quantised to keep it small.
      const out = path.join(ASSET_DIR, card.output);
      await sharp(raw)
        .resize(WIDTH, HEIGHT)
        .png({ palette: true, quality: 90 })
        .toFile(out);

      const { size } = await fs.stat(out);
      console.log(
        `${card.output}  ${WIDTH}x${HEIGHT}  ${(size / 1024).toFixed(0)} KB`,
      );
    }

    /*
     * A portrait is unreadable at 32px, so the icons render from the mark
     * instead. Drawn at 512 and downsampled, which keeps the stroke weights
     * proportional at every size.
     */
    await page.setViewport({ width: MARK_PX, height: MARK_PX });

    const shoot = async (text, stroke) => {
      await page.setContent(markHtml(text, stroke), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);

      return page.screenshot({ type: "png", omitBackground: true });
    };

    for (const mark of marks) {
      // A pair of glyphs is limited by width, a lone one by height, so each
      // cut fills its tile without the single letter looking undersized.
      const full = await composeMark(await shoot(mark.text, 0), {
        widthFrac: 0.78,
        heightFrac: 0.62,
      });

      // Always a separate render: the small cut differs by weight, not just
      // by letter count, so even a one-letter mark needs its own pass.
      const small = await composeMark(await shoot(mark.small, 14), {
        widthFrac: 0.62,
        heightFrac: 0.62,
      });

      for (const [size, source] of [
        [180, full],
        [32, full],
        [16, small],
      ]) {
        const name = `icon-${mark.slug}-${size}.png`;
        const out = path.join(ASSET_DIR, name);

        await sharp(source)
          .resize(size, size)
          .png({ compressionLevel: 9 })
          .toFile(out);

        const stat = await fs.stat(out);
        console.log(
          `${name}  ${size}x${size}  ${(stat.size / 1024).toFixed(1)} KB`,
        );
      }

      // Cardin's mark doubles as the legacy /favicon.ico fallback.
      if (mark.slug === "cn") await buildFavicon(full, small);
    }

  } finally {
    await browser.close();
  }
}

/**
 * The old .ico stored its entries as uncompressed BMP, which is how four small
 * icons reached 25 KB. ICO has allowed PNG payloads since Vista.
 */
async function buildFavicon(full, small) {
  // 16 takes the single-letter cut for the same reason the PNG set does.
  const sizes = [
    [16, small],
    [32, full],
    [48, full],
  ];
  const images = await Promise.all(
    sizes.map(([size, source]) =>
      sharp(source).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  let offset = header.length + sizes.length * 16;
  const entries = sizes.map(([size], index) => {
    const entry = Buffer.alloc(16);
    entry[0] = size; // a 0 here would mean 256
    entry[1] = size;
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(images[index].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += images[index].length;

    return entry;
  });

  const out = path.join(PUBLIC_DIR, "favicon.ico");
  await fs.writeFile(out, Buffer.concat([header, ...entries, ...images]));

  const { size } = await fs.stat(out);
  console.log(
    `favicon.ico  ${sizes.map(([px]) => px).join("/")}px  ${(size / 1024).toFixed(1)} KB`,
  );
}

main().catch((error) => {
  console.error("Failed to render social images:", error);
  process.exit(1);
});
