import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import CountUp from "../CountUp/CountUp";
import "./DiamondCard.css";

interface DiamondCardItemData {
  icon?: React.ReactNode;
  title: string;
  counter?: number;
  description?: string;
  webLiveLink?: string;
  webGithubLink?: string;
  image?: string;
  aos?: string;
  className?: string;
}

interface Props {
  item: DiamondCardItemData;
  isMobile: boolean;
  round?: boolean;
  showCounter?: boolean;
  showIcon?: boolean;
  showProjectImage?: boolean;
  btnGroup?: boolean;
  variant?: "highlights" | "services" | "projects";
}

const DiamondCard: React.FC<Props> = ({
  item,
  isMobile,
  round,
  showCounter = true,
  showIcon = true,
  showProjectImage = false,
  btnGroup = false,
  variant = "highlights",
}) => {
  return (
    <motion.div
      data-aos={item.aos}
      className={`${isMobile ? "mobile-item" : "desktop-item"} ${round ? "round" : ""} card-variant-${variant}`}
    >
      {showProjectImage && item.image !== undefined && (
        <figure className="project-image">
          <img src={item.image} alt={item.title} />
        </figure>
      )}
      <div className="moving-diamond-pattern">
        {showIcon && item.icon !== undefined && <i>{item.icon}</i>}
        {showCounter && item.counter !== undefined && (
          <div className="counter-container">
            <CountUp to={item.counter} from={0} className="themed-text" />
            <span className="plus-sign themed-text">+</span>
          </div>
        )}
        <h2 className="title themed-text">{item.title}</h2>

        {item.description && (
          <p className="card-description themed-text">{item.description}</p>
        )}
        {btnGroup && item.webGithubLink !== undefined && (
          <div className="btn-group">
            <a href={item.webGithubLink}>
              <i>
                <FaGithub />
              </i>
            </a>
            <a href=""></a>
          </div>
        )}
      </div>
      <div className="holo-swipe"></div>
      <div className="g-corner g-tl"></div>
      <div className="g-corner g-br"></div>
    </motion.div>
  );
};

export default DiamondCard;
