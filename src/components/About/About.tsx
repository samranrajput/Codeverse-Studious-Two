import React, { memo } from "react";
import headerImage from "../../assets/images/my_image.png";
import ProfileCardIcon from "../../assets/images/side-bar-dark-logo.png";
import ShinyText from "../ShinyText/ShinyText";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./About.css";

const About: React.FC = memo(() => {
  return (
    <section id="about">
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="About Us"
          speed={2}
          spread={135}
          direction="left"
          yoyo
          pauseOnHover
          disabled={false}
          className="sections-heading themed-text"
        />
      </div>
      <div className="container">
        <ProfileCard
          name="Muhammad Samran"
          title="Software Engineer"
          handle="codeverse_studious"
          status="Online"
          contactText="Contact Me"
          avatarUrl={headerImage}
          iconUrl={ProfileCardIcon}
          showUserInfo
          enableTilt={true}
          enableMobileTilt
          onContactClick={() => console.log("Contact clicked")}
          showIcon={true}
          showBehindGlow={true}
          behindGlowColor="rgba(255, 255, 255, 0.6)"
          customInnerGradient="linear-gradient(145deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%)"
        />

        <div className="about-contant-container" data-aos="fade-left">
          <h1>
            <ShinyText
              text="I started learning programming at the age of 15, and now at 18, I
            proudly hold 6 programming certificates."
              speed={2}
              spread={135}
              direction="left"
              yoyo
              pauseOnHover
              disabled={false}
              className="themed-text"
            />
          </h1>
          <h1>
            <ShinyText
              text="My passion
            for coding drives me to create powerful, dynamic, and visually
            appealing websites that bring ideas to life."
              speed={2}
              spread={135}
              direction="left"
              yoyo
              pauseOnHover
              disabled={false}
              className="themed-text"
            />
          </h1>
          <h1>
            <ShinyText
              text="Over the
            past three years, I have built many real-world projects some of
            which you can explore below in the projects section."
              speed={2}
              spread={135}
              direction="left"
              yoyo
              pauseOnHover
              disabled={false}
              className="themed-text"
            />
          </h1>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
