import React from "react";
import headerImage from "../../assets/images/project1.png";
import ShinyText from "../ShinyText/ShinyText";
import Carousel from "../Carousel/Carousel";
import ProjectsItem from "../ProjectsItem/ProjectsItem";

const Projects: React.FC = () => {
  const PROJECTS_ITEM = [
    {
      id: 1,
      aos: "fade-right",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
    {
      id: 2,
      aos: "fade-down",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
    {
      id: 3,
      aos: "fade-left",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
    {
      id: 4,
      aos: "fade-right",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
    {
      id: 5,
      aos: "fade-up",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
    {
      id: 6,
      aos: "fade-left",
      image: headerImage,
      title: "Website SEO Optimization",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation.",
      webGithubLink:
        "https://github.com/samranrajput/Digital-Clock-and-Analog-Clock",
      webLiveLink: "https://digital-clock-and-analog-clock.vercel.app/",
    },
  ];

  return (
    <section id="projects" style={{ overflow: "hidden" }}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Projects"
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
        <Carousel
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          renderItem={ProjectsItem as any}
          items={PROJECTS_ITEM as any}
        />
      </div>
    </section>
  );
};

export default Projects;
