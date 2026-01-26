import React, { memo } from "react";
import headerImage from "../../assets/images/my_image.png";
import myResume from "../../assets/docs/my_resume.pdf";
import Navbar from "../Navbar/Navbar";
import TextType from "../TextType/TextType";
import GlassIcons from "../GlassIcons/GlassIcons";
import ShinyText from "../ShinyText/ShinyText";
import "./Header.css";

import { FaMobileScreenButton } from "react-icons/fa6";
import {
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaCode,
  FaDatabase,
  FaPenNib,
} from "react-icons/fa";

const Header: React.FC = memo(() => {
  const items = [
    { icon: <FaGithub />, color: "#00a384", label: "Github" },
    { icon: <FaInstagram />, color: "#00a384", label: "Instagram" },
    { icon: <FaTiktok />, color: "#00a384", label: "Tiktok" },
    { icon: <FaLinkedinIn />, color: "#00a384", label: "Linkedin" },
    { icon: <FaWhatsapp />, color: "#00a384", label: "Whatsapp" },
    { icon: <FaFacebookF />, color: "#00a384", label: "Facebook" },
  ];
  return (
    <header id="home">
      <div className="shape"></div>
      <div className="skill-container">
        <div className="ring">
          <div className="skill skill1">
            <i className="themed-text">
              <FaCode />
            </i>
            <p className="themed-text">
              Frontend Web <br />
              Developer
            </p>
          </div>
          <div className="skill skill2">
            <i className="themed-text">
              <FaDatabase />
            </i>
            <p className="themed-text">
              Backend Web <br />
              Developer
            </p>
          </div>
          <div className="skill skill3">
            <i className="themed-text">
              <FaMobileScreenButton />
            </i>
            <p className="themed-text">
              Mobile Application
              <br />
              Developer
            </p>
          </div>
          <div className="skill skill4">
            <i className="themed-text">
              <FaPenNib />
            </i>
            <p className="themed-text">Graphic Designer</p>
          </div>
        </div>
      </div>
      <div className="container">
        <Navbar />
        <div className="header-contant">
          <h1>
            <span className="themed-text">Hello, I'm</span>
            <TextType
              text={["Muhammad Samran"]}
              typingSpeed={60}
              pauseDuration={4000}
              showCursor
              cursorCharacter="_"
              deletingSpeed={30}
              variableSpeedEnabled={false}
              variableSpeedMin={150}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
              style={{ paddingLeft: "0.5em" }}
            />
          </h1>
          <h1>
            <span className="themed-text">And I'm a</span>
            <TextType
              text={["Software Engineer"]}
              typingSpeed={60}
              pauseDuration={4000}
              showCursor
              cursorCharacter="_"
              deletingSpeed={30}
              variableSpeedEnabled={false}
              variableSpeedMin={150}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
              style={{ paddingLeft: "0.5em" }}
            />
          </h1>
          <TextType
            text={[
              "I'm a Full Stack Web Developer who loves building websites that don't just look great they perform beautifully.",
              "From dynamic business websites to full-scale web applications, I turn ideas into reality with clean code and modern design.",
              "My goal is to help businesses grow online through fast, secure, and engaging digital experiences.",
              "If you're looking for a developer who truly cares about quality, you're in the right place.",
            ]}
            typingSpeed={30}
            pauseDuration={4000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={20}
            variableSpeedEnabled={false}
            variableSpeedMin={150}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
            className="themed-text contant"
          />
          <div className="icon-container">
            <GlassIcons items={items} className="custom-class" />
          </div>
          <div className="btn-container">
            <a
              href={myResume}
              target="_blank"
              rel="noreferrer"
              className="themed-text themed-border btn"
            >
              <ShinyText
                text="My Resume !"
                speed={2}
                delay={0}
                shineColor="#00a384"
                spread={130}
                direction="left"
                yoyo
                pauseOnHover
                disabled={false}
              />
            </a>

            <a
              href="https://wa.me/923172960156"
              target="_blank"
              rel="noreferrer"
              className="themed-text themed-border btn"
            >
              <ShinyText
                text="Hire Me Now !"
                speed={2}
                delay={0}
                shineColor="#00a384"
                spread={130}
                direction="left"
                yoyo
                pauseOnHover
                disabled={false}
              />
            </a>
          </div>
        </div>
        <div className="header-design">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            style={{ willChange: "transform" } as React.CSSProperties}
          >
            <circle className="st0" cx="500" cy="500" r="320">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 500 500"
                to="360 500 500"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            <circle className="st1" cx="500" cy="500" r="366.8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 500 500"
                to="-360 500 500"
                dur="25s"
                repeatCount="indefinite"
              />
            </circle>

            <circle className="st2" cx="500" cy="500" r="385.1" />
          </svg>

          <figure>
            <img
              src={headerImage}
              alt="Header Frame"
              loading="lazy"
              style={{ pointerEvents: "none" }}
            />
          </figure>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
