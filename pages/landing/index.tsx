import type { NextPage } from "next";

import { LandingHero } from "../../components/Landing";
import { Seo } from "../../components/Misc/Seo.component";

const LandingPage: NextPage = () => {
  return (
    <>
      <Seo
        title="nguyen.ink"
        description="The front door for nguyen.ink. Pick a subdomain: cardin.nguyen.ink for Cardin Nguyen's portfolio, or dylan.nguyen.ink."
        url="https://nguyen.ink"
      />

      <main className="min-h-screen overflow-hidden">
        <LandingHero />
      </main>
    </>
  );
};

export default LandingPage;
