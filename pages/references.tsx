import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/api/documents/references",
      permanent: false,
    },
  };
};

const ReferencesPage = () => null;

export default ReferencesPage;