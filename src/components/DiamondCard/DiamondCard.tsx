import React from "react";
import { motion } from "framer-motion";
import CountUp from "../CountUp/CountUp";
import "./DiamondCard.css";

interface DiamondCardItemData {
  icon?: React.ReactNode;
  title: string;
  counter?: number;
  description?: string;
  extraInfo?: string;
  aos?: string;
  className?: string;
}

interface Props {
  item: DiamondCardItemData;
  isMobile: boolean;
  round?: boolean;
  showCounter?: boolean;
  variant?: "highlights" | "services";
}

const DiamondCard: React.FC<Props> = ({
  item,
  isMobile,
  round,
  showCounter = true,
  variant = "highlights", // Default value
}) => {
  return (
    <motion.div
      data-aos={item.aos}
      className={`${isMobile ? "mobile-item" : "desktop-item"} ${round ? "round" : ""} card-variant-${variant}`}
    >
      <div className="moving-diamond-pattern">
        {item.icon && <i>{item.icon}</i>}
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

        {item.extraInfo && <span className="extra-tag">{item.extraInfo}</span>}
      </div>
      <div className="holo-swipe"></div>
      <div className="g-corner g-tl"></div>
      <div className="g-corner g-br"></div>
    </motion.div>
  );
};

export default DiamondCard;
