import Document, { Head, Html, Main, NextScript } from "next/document";

/*
 * Runs before the first paint, so a stored choice never flashes the wrong
 * theme. Deliberately plain DOM: the landing route ships no React, and this
 * has to work there too.
 *
 * `data-theme` drives the palette and is left off for "auto", which hands the
 * decision back to the prefers-color-scheme rule. `data-theme-pref` records
 * what the reader actually picked, which is what the toggle renders from.
 */
const THEME_SCRIPT = `(function(){
var d=document.documentElement;
function read(){var m=document.cookie.match(/(?:^|;\s*)theme=(light|dark|auto)/);return m?m[1]:"auto"}
function apply(p){
d.dataset.themePref=p;
if(p==="auto"){d.removeAttribute("data-theme")}else{d.dataset.theme=p}
var b=d.querySelectorAll("[data-theme-set]");
for(var i=0;i<b.length;i++){b[i].setAttribute("aria-pressed",b[i].getAttribute("data-theme-set")===p)}
var m=d.querySelectorAll('meta[name="theme-color"][data-scheme]');
for(var j=0;j<m.length;j++){var s=m[j].getAttribute("data-scheme");
m[j].setAttribute("media",p==="auto"?"(prefers-color-scheme: "+s+")":p===s?"all":"not all")}
}
apply(read());
document.addEventListener("DOMContentLoaded",function(){apply(read())});
document.addEventListener("click",function(e){
var t=e.target&&e.target.closest?e.target.closest("[data-theme-set]"):null;
if(!t)return;
var p=t.getAttribute("data-theme-set");
var dom=/(^|\.)nguyen\.ink$/.test(location.hostname)?";domain=.nguyen.ink":"";
var sec=location.protocol==="https:"?";secure":"";
document.cookie="theme="+p+";path=/;max-age=31536000;samesite=lax"+dom+sec;
apply(p)});
})();`;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-theme-pref="auto">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assests/icon-32.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assests/icon-180.png"
          />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {/*
            Fonts are fetched in CORS mode even same-origin, so dropping
            `crossOrigin` here makes the browser download each one twice.
          */}
          {[
            "ibm-plex-sans-latin-400-normal.woff2",
            "ibm-plex-sans-latin-600-normal.woff2",
            "ibm-plex-mono-latin-500-normal.woff2",
          ].map((file) => (
            <link
              key={file}
              rel="preload"
              as="font"
              type="font/woff2"
              href={`/fonts/${file}`}
              crossOrigin="anonymous"
            />
          ))}

          {/* The script below retargets these when the reader forces a theme. */}
          <meta
            name="theme-color"
            data-scheme="light"
            media="(prefers-color-scheme: light)"
            content="#f2f1ec"
          />
          <meta
            name="theme-color"
            data-scheme="dark"
            media="(prefers-color-scheme: dark)"
            content="#141311"
          />

          <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        </Head>
        <body className="bg-paper antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
