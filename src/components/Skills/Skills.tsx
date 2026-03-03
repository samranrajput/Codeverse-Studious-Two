import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaDatabase,
  FaWordpress,
  FaLaravel,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  RiTailwindCssFill,
  RiJavascriptFill,
  RiNextjsFill,
} from "react-icons/ri";
import { BiLogoDjango } from "react-icons/bi";
import { SiReact, SiPhp, SiTypescript } from "react-icons/si";
import PythonIcon from "../../assets/images/py_icon.png";
import JavaIcon from "../../assets/images/java_icon.png";
import ShinyText from "../ShinyText/ShinyText";
import LogoLoop from "../LogoLoop/LogoLoop";

const Skills: React.FC = () => {
  const techLogos = [
    {
      node: <FaHtml5 style={{ color: "#E34F26" }} />,
      title: "HTML",
      href: "https://www.w3schools.com/html/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaCss3Alt style={{ color: "#1572B6" }} />,
      title: "CSS",
      href: "https://www.w3schools.com/css/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaBootstrap style={{ color: "#7952B3" }} />,
      title: "Bootstrap",
      href: "https://www.w3schools.com/bootstrap/bootstrap_ver.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <RiTailwindCssFill style={{ color: "#06B6D4" }} />,
      title: "Tailwind",
      href: "https://v2.tailwindcss.com/docs",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <RiJavascriptFill style={{ color: "#F7DF1E" }} />,
      title: "Javascript",
      href: "https://www.w3schools.com/js/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <SiTypescript style={{ color: "#007ACC" }} />,
      title: "Nodejs",
      href: "https://www.w3schools.com/typescript/index.php",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <SiReact style={{ color: "#61DAFB" }} />,
      title: "React",
      href: "https://www.w3schools.com/react/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: (
        <RiNextjsFill
          style={{
            color: "#000",
            background: "radial-gradient(circle, #fff 50%, transparent 52%)",
            borderRadius: "50%",
          }}
        />
      ),
      title: "React",
      href: "https://nextjs.org/docs",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <img src={PythonIcon} alt="" style={{ transform: "scale(1.2)" }} />,
      title: "Python",
      href: "https://www.w3schools.com/python/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: (
        <BiLogoDjango
          style={{ color: "#fff", background: "#092E20", borderRadius: "15px" }}
        />
      ),
      title: "Django",
      href: "https://docs.djangoproject.com/en/6.0/",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaDatabase style={{ color: "#00618A" }} />,
      title: "Database",
      href: "https://www.w3schools.com/sql/",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <SiPhp style={{ color: "#777BB4" }} />,
      title: "PHP",
      href: "https://www.w3schools.com/php/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaWordpress style={{ color: "#21759B" }} />,
      title: "Wordpress",
      href: "https://wordpress.org/documentation/",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaLaravel style={{ color: "#FF2D20" }} />,
      title: "Laravel",
      href: "https://laravel.com/docs/",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <img src={JavaIcon} alt="" style={{ transform: "scale(1.2)" }} />,
      title: "Java",
      href: "https://www.w3schools.com/java/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaGitAlt style={{ color: "#F05032" }} />,
      title: "Git",
      href: "https://www.w3schools.com/git/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <FaGithub className="themed-main-text" />,
      title: "Github",
      href: "https://www.w3schools.com/git/default.asp",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
    {
      node: <p className="themed-main-text">AI</p>,
      title: "AI",
      href: "https://chatgpt.com/",
      skillName: "HTML5", // Add this
      experiencePercent: 90,
    },
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
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="right"
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        useCustomRender={false}
        fadeOutColor="#00a384"
        ariaLabel="Technology partners"
      />
    </section>
  );
};

export default Skills;
