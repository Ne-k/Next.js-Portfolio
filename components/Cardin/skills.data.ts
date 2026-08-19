export type Skill = {
  name: string;
  icon: "shield" | "python" | "typescript" | "node" | "java" | "camera";
  blurb: string;
  tags: string[];
};

export const skills: Skill[] = [
  {
    name: "Cybersecurity",
    icon: "shield",
    blurb: "Penetration testing, vulnerability assessment, and digital forensics.",
    tags: ["Burp Suite", "Wireshark", "Nmap"],
  },
  {
    name: "Python",
    icon: "python",
    blurb: "Automation and security tooling. Usually what I reach for first.",
    tags: ["Automation", "Tooling", "Scripting"],
  },
  {
    name: "TypeScript",
    icon: "typescript",
    blurb: "Next.js and Vite applications, including this site.",
    tags: ["Next.js", "React", "Vite"],
  },
  {
    name: "Node.js",
    icon: "node",
    blurb: "Backend services and small internal tools, deployed on Linux.",
    tags: ["APIs", "Docker", "Linux"],
  },
  {
    name: "Java",
    icon: "java",
    blurb: "Four seasons of competition robotics code for FRC 7034 and FTC 10332.",
    tags: ["FRC", "FTC", "Robotics"],
  },
  {
    name: "Photo and video",
    icon: "camera",
    blurb: "Sony A7R IV for stills, A7 IV for video. Events and creative work.",
    tags: ["Sony", "Live events", "Post"],
  },
];
