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
  RiNodejsLine,
} from "react-icons/ri";
import { FaDartLang, FaFlutter } from "react-icons/fa6";
import { BiLogoDjango } from "react-icons/bi";
import { SiReact, SiPhp } from "react-icons/si";
import PythonIcon from "../../assets/images/py_color.png";
import ShinyText from "../ShinyText/ShinyText";
import LogoLoop from "../LogoLoop/LogoLoop";

const Skills: React.FC = () => {
  const techLogos = [
    {
      node: <FaHtml5 style={{ color: "#E34F26" }} />,
      title: "HTML",
      href: "https://www.w3schools.com/html/",
    },
    {
      node: <FaCss3Alt style={{ color: "#1572B6" }} />,
      title: "CSS",
      href: "https://www.w3schools.com/css/",
    },
    {
      node: <FaBootstrap style={{ color: "#7952B3" }} />,
      title: "Bootstrap",
      href: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    },
    {
      node: <RiTailwindCssFill style={{ color: "#06B6D4" }} />,
      title: "Tailwind",
      href: "https://v2.tailwindcss.com/docs",
    },
    {
      node: <RiJavascriptFill style={{ color: "#F7DF1E" }} />,
      title: "Javascript",
      href: "https://www.w3schools.com/js/",
    },
    {
      node: <SiReact style={{ color: "#61DAFB" }} />,
      title: "React",
      href: "https://react.dev/learn",
    },
    {
      node: <RiNodejsLine style={{ color: "#339933" }} />,
      title: "Nodejs",
      href: "https://www.w3schools.com/nodejs/",
    },
    {
      node: <img src={PythonIcon} alt="" />,
      title: "Python",
      href: "https://docs.python.org/3/",
    },
    {
      node: (
        <BiLogoDjango
          style={{
            borderRadius: "15px",
            background: "#092E20",
            color: "#fff",
          }}
        />
      ),
      title: "Django",
      href: "https://docs.djangoproject.com/en/5.2/",
    },
    {
      node: <FaDatabase style={{ color: "#00618A" }} />,
      title: "Database",
      href: "https://www.w3schools.com/sql/",
    },
    {
      node: <SiPhp style={{ color: "#777BB4" }} />,
      title: "PHP",
      href: "https://www.w3schools.com/php/",
    },
    {
      node: <FaWordpress style={{ color: "#21759B" }} />,
      title: "Wordpress",
      href: "https://wordpress.org/documentation/",
    },
    {
      node: <FaLaravel style={{ color: "#FF2D20" }} />,
      title: "Laravel",
      href: "https://laravel.com/docs/12.x",
    },
    {
      node: <FaDartLang style={{ color: "#0175C2" }} />,
      title: "Dart",
      href: "https://dart.dev/docs",
    },
    {
      node: <FaFlutter style={{ color: "#02569B" }} />,
      title: "Flutter",
      href: "https://docs.flutter.dev/",
    },
    {
      node: <FaGitAlt style={{ color: "#F05032" }} />,
      title: "Git",
      href: "https://git-scm.com/docs",
    },
    {
      node: <FaGithub className="themed-text" />,
      title: "Github",
      href: "https://docs.github.com/en",
    },
    {
      node: <p className="themed-text ai">AI</p>,
      title: "AI",
      href: "https://chatgpt.com/",
    },
  ];

  return (
    <section id="skills" style={{ overflow: "hidden" }}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Skills"
          speed={2}
          delay={0}
          shineColor="#00a384"
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
        speed={150}
        direction="right"
        logoHeight={110}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#00a384"
        ariaLabel="Technology partners"
      />
    </section>
  );
};

export default Skills;
