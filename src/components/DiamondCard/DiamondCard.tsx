import React from "react";
import { Zap } from "lucide-react";
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
}

interface Props {
  item: DiamondCardItemData;
  isMobile: boolean;
  round?: boolean;
  showCounter?: boolean;
}

const DiamondCard: React.FC<Props> = ({
  item,
  isMobile,
  round,
  showCounter = true,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className={`${isMobile ? "mobile-item" : "desktop-item"} ${round ? "round" : ""}`}
    >
      {/* 1. MOVING PATTERN (Wahi purana wala) */}
      <div className="moving-diamond-pattern"></div>

      {/* 2. HOLOGRAPHIC SHINING SWIPE (Jo aapko pasand aya) */}
      <div className="holo-swipe"></div>

      {/* 3. DARK OVERLAY (Top transparent, Bottom black) */}
      <div className="dark-overlay"></div>

      {/* Header Icon */}
      {item.icon && <i className="icon-badge">{item.icon}</i>}

      <div className="stat-centerpiece">
        {/* Counter Logic */}
        {showCounter && item.counter !== undefined && (
          <div className="counter-container">
            <CountUp
              to={item.counter}
              from={0}
              className="diamond-count themed-text"
            />
            <span className="plus-sign">+</span>
          </div>
        )}
      </div>

      <div className="card-bottom">
        <h2 className="stat-title themed-text">{item.title}</h2>

        {item.description && (
          <p className="card-description themed-text">{item.description}</p>
        )}

        {item.extraInfo && <span className="extra-tag">{item.extraInfo}</span>}

        <div className="divider-gaming">
          <span className="line-half"></span>
          <Zap size={20} className="zap-icon-glow" />
          <span className="line-half"></span>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="g-corner g-tl"></div>
      <div className="g-corner g-br"></div>
    </motion.div>
  );
};

export default DiamondCard;
