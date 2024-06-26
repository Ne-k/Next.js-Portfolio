import { BsArrowRightShort, FaJava, FaNodeJs, SiTypescript, FiCamera } from "../Misc/Icons.collection";
import {SiPython} from "react-icons/si";

const Skills = () => {
  return (
    <div className="my-16 px-3 font-sen text-white" id="skills">
      <p className="text-3xl font-bold text-white">Skills</p>

      <div className="text-md my-8 flex flex-col font-medium md:text-xl custom:text-lg">
        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FiCamera size="30" />
          <span className="text-white">Photography</span>
          &nbsp;I enjoy capturing the moments with a DSLR as a hobby
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaNodeJs size="30" />
          <span className="text-white">Javascript </span>
          &nbsp; the language I use for small projects I want done quickly
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiTypescript size="30" />
          <span className="text-white">Typescript </span>
          &nbsp; as the language I use for small private projects
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <SiPython size="30" />
          <span className="text-white">Python </span>
          &nbsp; to automate my daily tasks
        </p>

        <p className="flex flex-row items-center border-b-[0.1px] border-gray-500 py-1 text-slate-300">
          <FaJava size="30" />
          <span className="text-white">Java </span>
          &nbsp; the language I mainly use for robotics
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
