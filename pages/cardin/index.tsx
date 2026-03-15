import Head from "next/head";
import type { NextPage } from "next";

import {
  Header,
  About,
  Projects,
  Skills,
  Contact,
  NowPlaying,
} from "../../components/Cardin";

const CardinPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cardin Nguyen | Backend Developer</title>
        <meta
          name="description"
          content="Cardin Nguyen's portfolio covering backend development, projects, photography, and current work."
        />
        <link rel="canonical" href="https://cardin.nguyen.ink" />
        <meta property="og:title" content="Cardin Nguyen | Backend Developer" />
        <meta
          property="og:description"
          content="Portfolio site for Cardin Nguyen, backend developer, student, photographer, and cybersecurity enthusiast."
        />
        <meta property="og:url" content="https://cardin.nguyen.ink" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://media.discordapp.net/attachments/953754034630717454/999515622801158304/image0_13.jpg"
        />
        <meta
          name="keywords"
          content="Cardin Nguyen, backend developer, portfolio, Nek, web developer, cybersecurity, photography"
        />
      </Head>

      <main className="px-2 sm:px-8 md:px-24 lg:px-48 xl:px-72">
        <Header />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <NowPlaying />
      </main>
    </>
  );
};

export default CardinPage;