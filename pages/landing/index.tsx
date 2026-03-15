import Head from "next/head";
import type { NextPage } from "next";
import { LandingHero } from "../../components/Landing";

const LandingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nguyen.ink</title>
        <meta
          name="description"
          content="Nguyen.ink is a placeholder page while the main landing experience is being prepared."
        />
        <link rel="canonical" href="https://nguyen.ink" />
        <meta property="og:title" content="Nguyen.ink" />
        <meta
          property="og:description"
          content="Nguyen.ink is a placeholder page while the main landing experience is being prepared."
        />
        <meta property="og:url" content="https://nguyen.ink" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
        <LandingHero />
      </main>
    </>
  );
};

export default LandingPage;