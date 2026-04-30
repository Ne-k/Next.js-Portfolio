import Image from "next/image";

import { HiOutlineArrowNarrowRight } from "../Misc/Icons.collection";

const About = () => {
  return (
    <div className="my-8 flex flex-row items-center justify-between px-3 font-sen">
      <div>
        <p className="text-3xl font-bold text-white">Cardin Nguyen</p>
        <p className="mt-1 text-lg text-gray-300">
          Backend Developer, Student, and Cybersecurity Enthusiast focused on
          penetration testing and digital forensics.
        </p>
        <p className="mt-1 text-lg text-gray-300">Online I&apos;m known as &quot;Nek&quot;.</p>
        <p className="mt-4 text-gray-400">
          I design and build reliable backend systems, and I&apos;ve been shipping
          practical software projects for more than five years.
        </p>

        <a
          href="/CN_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex cursor-pointer flex-row items-center gap-1 font-jost text-xl text-gray-400 duration-100 hover:ml-2"
        >
          View Resume
          <HiOutlineArrowNarrowRight />
        </a>

        {/* <a
          href="/CN_References.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex cursor-pointer flex-row items-center gap-1 font-jost text-xl text-gray-400 duration-100 hover:ml-2"
        >
          View References
          <HiOutlineArrowNarrowRight />
        </a> */}
      </div>

      <div className="hidden custom:block">
        <div className="rounded-full bg-gradient-to-r from-blue-200 to-blue-400 p-2">
          <div className="relative h-36 w-36">
            <Image
              src="/assests/avatar.png"
              fill
              sizes="144px"
              className="rounded-full object-cover"
              alt="Cardin Nguyen avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
