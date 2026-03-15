import Head from "next/head";
import type { NextPage } from "next";
import { DylanHero } from "../../components/Dylan";

const DylanPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dylan Nguyen | Coming Soon</title>
        <meta
          name="description"
          content="A placeholder page for Dylan Nguyen at dylan.nguyen.ink while the full site is being prepared."
        />
        <link rel="canonical" href="https://dylan.nguyen.ink" />
        <meta property="og:title" content="Dylan Nguyen | Coming Soon" />
        <meta
          property="og:description"
          content="Dylan Nguyen's page is reserved and will launch here soon."
        />
        <meta property="og:url" content="https://dylan.nguyen.ink" />
      </Head>

      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white sm:px-10 lg:px-12">
        <DylanHero />
      </main>
    </>
  );
};

export default DylanPage;