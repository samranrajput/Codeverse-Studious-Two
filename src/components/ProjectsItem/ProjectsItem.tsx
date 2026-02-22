import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import "./ProjectsItem.css";

interface ProjectItemData {
  aos?: string;
  image?: string;
  title: string;
  description?: string;
  webLiveLink?: string;
  webGithubLink?: string;
}

interface HighlightsItemProps {
  item: ProjectItemData;
  isMobile: boolean;
  round?: boolean;
  style?: React.CSSProperties;
  itemRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export default function ProjectItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className = "",
}: HighlightsItemProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };
  return (
    <div
      data-aos={item.aos}
      ref={itemRef}
      className={`themed-section-card ${className} ${
        isMobile ? "mobile-item" : "desktop-item"
      } ${round ? "round" : ""}`.trim()}
      style={style}
    >
      <figure className="project-image">
        <img src={item.image} alt={item.title} />
      </figure>
      <div className="overlay themed-overlay">
        <h1 className="themed-main-text">{item.title}</h1>

        <p className="themed-main-text">{item.description}</p>

        <div className="btn-group">
          <a href={item.webLiveLink} target="_blank" rel="noreferrer">
            <i className="themed-main-text themed-bg">
              <FaArrowUpRightFromSquare />
            </i>
          </a>

          <button onClick={handleLike}>
            <motion.i
              initial={false}
              className="themed-main-text themed-bg like-button"
              animate={{
                scale: liked ? [1, 1.5, 1.2, 1] : 1,
                color: liked ? "#ff3040" : "",
              }}
              transition={{ duration: 0.4, times: [0, 0.2, 0.5, 1] }}
              whileTap={{ scale: 0.8 }}
              // style={{ fontSize: "3rem" }}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </motion.i>
          </button>
          <a href={item.webGithubLink} target="_blank" rel="noreferrer">
            <i className="themed-main-text themed-bg">
              <TbBrandGithubFilled />
            </i>
          </a>
        </div>
      </div>
      <div className="holo-swipe themed-holo-swipe"></div>
    </div>
  );
}
