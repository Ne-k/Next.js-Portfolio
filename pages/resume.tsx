import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/api/documents/resume",
      permanent: false,
    },
  };
};

const ResumePage = () => null;

export default ResumePage;