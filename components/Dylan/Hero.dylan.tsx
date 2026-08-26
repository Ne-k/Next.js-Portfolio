import { Sheet } from "../Misc/Sheet.component";

const DylanHero = () => {
  return (
    <Sheet masthead="dylan.nguyen.ink / reserved">
      <h1 className="text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink">
        Dylan Nguyen
      </h1>

      <p className="mt-6 max-w-measure text-[1.0625rem] leading-[1.7]">
        This page is reserved and still under construction. Once the full site
        is ready, it will launch right here.
      </p>

      <dl className="mt-14 max-w-sm">
        <div className="flex items-baseline justify-between gap-6 border-t border-ink py-3">
          <dt className="label text-ink-faint">Status</dt>
          <dd className="label text-ink">Reserved</dd>
        </div>
        <div className="flex items-baseline justify-between gap-6 border-t border-rule-soft py-3">
          <dt className="label text-ink-faint">Parent</dt>
          <dd className="label text-ink">nguyen.ink</dd>
        </div>
      </dl>

      <div className="mt-12">
        <a
          href="https://nguyen.ink"
          className="label inline-block border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Back to nguyen.ink
        </a>
      </div>
    </Sheet>
  );
};

export default DylanHero;
