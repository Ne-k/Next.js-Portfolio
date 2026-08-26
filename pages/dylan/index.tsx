import type { NextPage } from "next";

import { DylanHero } from "../../components/Dylan";
import { Seo } from "../../components/Misc/Seo.component";

const DylanPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Dylan Nguyen | Coming Soon"
        description="Dylan Nguyen's page at dylan.nguyen.ink is reserved and will launch here soon."
        url="https://dylan.nguyen.ink"
        image="https://nguyen.ink/assests/og-nguyen.png"
        imageAlt="nguyen.ink"
      />

      <main className="min-h-screen overflow-hidden">
        <DylanHero />
      </main>
    </>
  );
};

export default DylanPage;
