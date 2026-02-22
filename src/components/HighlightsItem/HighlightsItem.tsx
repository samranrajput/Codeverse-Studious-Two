import React from "react";
import CountUp from "../CountUp/CountUp";
import "./HighlightsItem.css";

interface HighlightItemData {
  aos?: string;
  icon: React.ReactNode;
  counter: number;
  title: string;
}

interface HighlightsItemProps {
  item: HighlightItemData;
  isMobile: boolean;
  round?: boolean;
  style?: React.CSSProperties;
  itemRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export default function HighlightsItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className = "",
}: HighlightsItemProps) {
  return (
    <div
      data-aos={item.aos}
      ref={itemRef}
      className={`themed-section-card ${className} ${
        isMobile ? "mobile-item" : "desktop-item"
      } ${round ? "round" : ""}`.trim()}
      style={style}
    >
      <i className="themed-main-text">{item.icon}</i>
      <div className="counter-container">
        <CountUp to={item.counter} from={0} className="themed-main-text" />
        <span className="plus-sign themed-main-text">+</span>
      </div>
      <h1 className="themed-main-text">
        {item.title}
      </h1>

      <div className="holo-swipe themed-holo-swipe"></div>
    </div>
  );
}
