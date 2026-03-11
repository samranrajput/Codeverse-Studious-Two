import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import ShinyText from "../ShinyText/ShinyText";
import { SkillsNetwork } from "../SkillsNetwork/SkillsNetwork";

const Skills: React.FC = () => {
  const mySkills = [
    { name: "HTML", icon: <FaHtml5 />, percent: 95 },
    { name: "CSS", icon: <FaCss3Alt />, percent: 90 },
    { name: "Bootstrap", icon: <FaBootstrap />, percent: 85 },
    { name: "Tailwind", icon: <RiTailwindCssFill />, percent: 80 },
    { name: "JavaScript", icon: <RiJavascriptFill />, percent: 90 },
    { name: "TypeScript", icon: <SiTypescript />, percent: 75 },
    { name: "React", icon: <SiReact />, percent: 85 },
    {
      name: "React Native",
      icon: "fa-solid fa-mobile-screen-button",
      percent: 70,
    },
    { name: "Git", icon: <FaGitAlt />, percent: 88 },
    { name: "GitHub", icon: <FaGithub />, percent: 92 },
  ];

  return (
    <section id="skills" style={{ overflow: "hidden" }}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Skills"
          speed={2}
          spread={135}
          direction="left"
          yoyo
          pauseOnHover
          disabled={false}
          className="sections-heading themed-text"
        />
      </div>
      <SkillsNetwork centerName="FRONTEND SKILLS" skills={mySkills} />;
      <SkillsNetwork centerName="FRONTEND SKILLS" skills={mySkills} />;
    </section>
  );
};

export default Skills;
