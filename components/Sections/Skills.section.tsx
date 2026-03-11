import { FaJava, FaNodeJs, SiTypescript, FiCamera, FaShieldAlt } from "../Misc/Icons.collection";
import { SiPython } from "react-icons/si";

const Skills = () => {
  return (
    <div className="my-16 px-3 font-sen text-white" id="skills">
      <p className="text-3xl font-bold text-white">Skills</p>

      <div className="text-md my-8 flex flex-col font-medium md:text-xl custom:text-lg">
        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FiCamera size="30" />
          <span className="text-white">Photography</span>
          &nbsp;I enjoy capturing the moments with a Sony A7RIV as a hobby, occasionally shooting sports photography
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaNodeJs size="30" />
          <span className="text-white">Javascript </span>
          &nbsp; Small projects and web development
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiTypescript size="30" />
          <span className="text-white">Typescript </span>
          &nbsp; Mostly used for webapps such as NextJS or vite
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiPython size="30" />
          <span className="text-white">Python </span>
          &nbsp; Autonomation scripts and small projects
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaJava size="30" />
          <span className="text-white">Java </span>
          &nbsp; the language mainly used in First Robotics Competition (FRC).
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaShieldAlt size="30" />
          <span className="text-white">Cybersecurity </span>
          &nbsp; Skills in penetration testing and digital forensics
        </p>
      </div>

      <p className="text-lg font-medium text-slate-300">
        ...more skills include <span className="text-white">NextJS</span>,{" "}
        <span className="text-white">Reactjs</span>,{" "}
        <span className="text-white">C++ </span>{" "}
      </p>
    </div>
  );
};

export default Skills;