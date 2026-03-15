import type { NextPage } from "next";

import Image from "next/image";
import { useRouter } from "next/router";

const ErrorPage: NextPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-6 py-12 text-white sm:px-10">
      <section className="w-full max-w-4xl rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
        <div className="mx-auto max-w-2xl">
          <Image
            src="/assests/404.svg"
            width={800}
            height={400}
            alt="404 illustration"
            className="h-auto w-full invert opacity-70"
            priority
          />
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-center text-center">
          <h1 className="font-jost text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 max-w-xl font-sen text-base text-zinc-300 sm:text-lg">
            The page you are looking for does not exist or may have been moved.
          </p>

          <button
            type="button"
            className="mt-6 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 font-jost text-sm uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
