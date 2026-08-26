import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";

import { Seo } from "../components/Misc/Seo.component";
import { Sheet } from "../components/Misc/Sheet.component";

const ErrorPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Page not found | nguyen.ink"
        description="The page you are looking for does not exist or has been moved."
        url="https://nguyen.ink/404"
        noIndex
      />

      <main>
        <Sheet masthead="nguyen.ink / error 404">
          <Image
            src="/assests/404.svg"
            width={800}
            height={330}
            alt=""
            aria-hidden="true"
            className="h-auto w-full max-w-sm opacity-80"
            // The optimizer 400s on SVG, which left this page with no drawing.
            unoptimized
            priority
          />

          <h1 className="mt-10 max-w-[14ch] border-t border-ink pt-5 text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
            This page does not exist
          </h1>

          <p className="mt-5 max-w-measure text-[1.0625rem] leading-[1.7]">
            The link may be broken, or the page might have moved somewhere else.
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="label inline-block border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Back to home
            </Link>
          </div>
        </Sheet>
      </main>
    </>
  );
};

export default ErrorPage;
