import React from "react";
import { FaLaptopCode, FaDatabase, FaPalette } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { FcSmartphoneTablet } from "react-icons/fc";
import { VscRobot } from "react-icons/vsc";
import ShinyText from "../ShinyText/ShinyText";
import Carousel from "../Carousel/Carousel";
import ServicesItem from "../ServicesItem/ServicesItem";

const Services: React.FC = () => {
  const SERVICES_ITEM = [
    {
      id: 1,
      aos: "fade-right",
      icon: <FaLaptopCode className="themed-text" />,
      title: "Front-End Web Development",
      description:
        "I specialize in crafting visually captivating and fully responsive websites using modern front-end technologies such as HTML, CSS, JavaScript, React, and Tailwind CSS. My goal is to deliver fast, accessible, and intuitive user interfaces that not only engage visitors but also ensure seamless performance across all devices.",
    },
    {
      id: 2,
      aos: "fade-down",
      icon: <FaDatabase className="themed-text" />,
      title: "Back-End Web Development",
      description:
        "I develop powerful and secure back-end systems using Python (Django) and PHP. From database design to API development and authentication systems, I focus on every detail to ensure your website is completely reliable, scalable, and efficient from the inside out. I work with databases such as SQLite, MySQL, and MongoDB to ensure optimal performance and strong data security.",
    },
    {
      id: 3,
      aos: "fade-left",
      icon: <FcSmartphoneTablet className="themed-text" />,
      title: "Mobile Application Development",
      description:
        "I develop cross-platform mobile applications using Dart + Flutter and Java + Android SDK, featuring smooth UI, high performance, and real-time database integration. Whether it’s Android or iOS, I deliver user-focused and visually engaging mobile solutions that transform your ideas into a functional and elegant digital experience.",
    },
    {
      id: 4,
      aos: "fade-right",
      icon: <BsBarChartFill className="themed-text" />,
      title: "Website SEO Optimization",
      description:
        "I optimize websites for better ranking and visibility on Google through clean code, meta tags, page speed improvements, and mobile-friendly structures. Strong SEO ensures more organic traffic and long-term growth for your business.",
    },
    {
      id: 5,
      aos: "fade-up",
      icon: <FaPalette className="themed-text" />,
      title: "UI/UX Design for Website",
      description:
        "I design elegant and user-centered web interfaces with a focus on usability, visual appeal, and smooth navigation. Using WebGL, Three.js, and advanced 3D/4D shader animations, I create interactive and visually immersive layouts. My goal is to deliver designs that are not only aesthetically impressive but also elevate user experience, engagement, and digital interaction to the next level.",
    },
    {
      id: 6,
      aos: "fade-left",
      icon: <VscRobot className="themed-text" />,
      title: "Online Management System with AI Chatbot",
      description:
        "I develop complete online management systems (school, hospital, or business) with integrated AI chatbots that automate communication and handle user queries smartly. These systems improve efficiency, data handling, and real-time user support.",
    },
  ];

  return (
    <section id="services" style={{ overflow: "hidden"}}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Services"
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
          renderItem={ServicesItem as any}
          items={SERVICES_ITEM as any}
        />
      </div>
    </section>
  );
};

export default Services;
