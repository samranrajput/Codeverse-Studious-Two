import React from "react";
import { FaProjectDiagram, FaHeart, FaLaptopCode } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import ShinyText from "../ShinyText/ShinyText";
import Carousel from "../Carousel/Carousel";
import HighlightsItem from "../HighlightsItem/HighlightsItem";
import "./Highlights.css";

const Highlights: React.FC = () => {
  const HIGHLIGHTS_ITEM = [
    {
      id: 1,
      aos: "fade-right",
      icon: <IoIosEye className="themed-text" />,
      title: "Views",
      counter: 100,
    },
    {
      id: 2,
      aos: "fade-down",
      icon: <FaProjectDiagram className="themed-text" />,
      title: "Projects",
      counter: 200,
    },
    {
      id: 3,
      aos: "fade-down",
      icon: <FaHeart className="themed-text" />,
      title: "Likes",
      counter: 100,
    },
    {
      id: 4,
      aos: "fade-left",
      icon: <FaLaptopCode className="themed-text" />,
      title: "Skills",
      counter: 100,
    },
  ];

  return (
    <section id="highlights">
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Highlights"
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
      <div className="container">
        <Carousel
          autoplay={true}
          autoplayDelay={4000}
          pauseOnHover={true}
          renderItem={HighlightsItem as any}
          items={HIGHLIGHTS_ITEM as any}
        />
      </div>
    </section>
  );
};

export default Highlights;
