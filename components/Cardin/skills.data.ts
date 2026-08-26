export type Skill = {
  name: string;
  blurb: string;
  tags: string[];
};

export const skills: Skill[] = [
  {
    name: "Cybersecurity",
    blurb:
      "Penetration testing, vulnerability assessment, and digital forensics.",
    tags: ["Burp Suite", "Wireshark", "Nmap"],
  },
  {
    name: "Python",
    blurb: "Automation and security tooling. Usually what I reach for first.",
    tags: ["Automation", "Tooling", "Scripting"],
  },
  {
    name: "TypeScript",
    blurb: "Next.js and Vite applications, including this site.",
    tags: ["Next.js", "React", "Vite"],
  },
  {
    name: "Node.js",
    blurb: "Backend services and small internal tools, deployed on Linux.",
    tags: ["APIs", "Docker", "Linux"],
  },
  {
    name: "Java",
    blurb:
      "Four seasons of competition robotics code for FRC 7034 and FTC 10332.",
    tags: ["FRC", "FTC", "Robotics"],
  },
  {
    name: "Photo and video",
    blurb: "Sony A7R IV for stills, A7 IV for video. Events and creative work.",
    tags: ["Sony", "Live events", "Post"],
  },
];

export const alsoKnows = [
  "Next.js",
  "React",
  "C++",
  "Docker",
  "Git",
  "SQL",
  "SSH",
  "IAM",
];
