import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
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
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Anchor tag redirect rokne ke liye
    setLiked(!liked);
  };

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
            <a href={item.webLiveLink} target="_blank" rel="noreferrer">
              <i>
                <FaArrowUpRightFromSquare />
              </i>
            </a>

            {/* Instagram Style Like Button */}
            <button
              className="like-button"
              onClick={handleLike}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <motion.i
                initial={false}
                animate={{
                  scale: liked ? [1, 1.5, 1.2, 1] : 1,
                  color: liked ? "#ff3040" : "#ffffff",
                }}
                transition={{ duration: 0.4, times: [0, 0.2, 0.5, 1] }}
                whileTap={{ scale: 0.8 }}
                style={{ display: "flex", fontSize: "1.2rem" }}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
              </motion.i>
            </button>
            <a href={item.webGithubLink} target="_blank" rel="noreferrer">
              <i>
                <TbBrandGithubFilled />
              </i>
            </a>
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
