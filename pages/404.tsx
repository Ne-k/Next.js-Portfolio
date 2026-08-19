import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";

import { Seo } from "../components/Misc/Seo.component";

const ErrorPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Page not found | nguyen.ink"
        description="The page you are looking for does not exist or has been moved."
        url="https://nguyen.ink/404"
        noIndex
      />

      <main className="relative isolate flex min-h-screen w-full items-center justify-center px-5 py-16 sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_55%_45%_at_50%_40%,#000_35%,transparent_100%)]" />
        </div>

        <section className="w-full max-w-2xl text-center">
          <Image
            src="/assests/404.svg"
            width={800}
            height={400}
            alt=""
            aria-hidden="true"
            className="mx-auto h-auto w-full max-w-md opacity-40 invert"
            priority
          />

          <p className="mt-8 font-jost text-xs uppercase tracking-[0.4em] text-accent-300/80">
            Error 404
          </p>
          <h1 className="mt-4 font-jost text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            This page does not exist
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
            The link may be broken, or the page might have moved somewhere else.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-jost text-sm font-semibold text-ink-950 transition-transform duration-150 hover:-translate-y-0.5"
          >
            Back to home
          </Link>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
