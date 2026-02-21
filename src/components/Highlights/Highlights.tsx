import React from "react";
import { FaProjectDiagram, FaHeart, FaLaptopCode } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import ShinyText from "../ShinyText/ShinyText";
import Carousel from "../Carousel/Carousel";
import HighlightsItem from "../HighlightsItem/HighlightsItem";

const Highlights: React.FC = () => {
  const HIGHLIGHTS_ITEM = [
    {
      id: 1,
      aos: "fade-right",
      icon: <IoIosEye />,
      title: "Views",
      counter: 100,
    },
    {
      id: 2,
      aos: "fade-up",
      icon: <FaProjectDiagram />,
      title: "Projects",
      counter: 200,
    },
    {
      id: 3,
      aos: "fade-up",
      icon: <FaHeart />,
      title: "Likes",
      counter: 100,
    },
    {
      id: 4,
      aos: "fade-left",
      icon: <FaLaptopCode />,
      title: "Skills",
      counter: 100,
    },
  ];

  return (
    <section id="highlights" style={{ overflow: "hidden" }}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Highlights"
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
          renderItem={HighlightsItem as any}
          items={HIGHLIGHTS_ITEM as any}
        />
      </div>
    </section>
  );
};

export default Highlights;
