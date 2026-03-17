import { FaJava, FaNodeJs, SiTypescript, FiCamera, FaShieldAlt } from "../Misc/Icons.collection";
import { SiPython } from "react-icons/si";

const Skills = () => {
  return (
    <div className="my-16 px-3 font-sen text-white" id="skills">
      <p className="text-3xl font-bold text-white">Skills</p>

      <div className="text-md my-8 flex flex-col font-medium md:text-xl custom:text-lg">
        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FiCamera size="30" />
          <span className="text-white">Photography and Videography</span>
          &nbsp;I shoot on a Sony A7RIV for stills and an A7IV for video, with experience ranging from creative shoots to occasional sports coverage.
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaNodeJs size="30" />
          <span className="text-white">JavaScript </span>
          &nbsp;Used for backend services, small tools, and web applications.
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiTypescript size="30" />
          <span className="text-white">TypeScript </span>
          &nbsp;Primarily used for Next.js and Vite-based web applications.
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiPython size="30" />
          <span className="text-white">Python </span>
          &nbsp;Automation scripts, security tooling, and smaller projects.
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaJava size="30" />
          <span className="text-white">Java </span>
          &nbsp;Primary language used in the First Robotics Competition (FRC).
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaShieldAlt size="30" />
          <span className="text-white">Cybersecurity </span>
          &nbsp;Hands-on experience in penetration testing and digital forensics.
        </p>
      </div>

      <p className="text-lg font-medium text-slate-300">
        ...additional skills include <span className="text-white">Next.js</span>,{" "}
        <span className="text-white">React</span>, and <span className="text-white">C++</span>
      </p>
    </div>
  );
};

export default Skills;
