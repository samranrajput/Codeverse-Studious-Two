import React from "react";
import CountUp from "../CountUp/CountUp";
import "./HighlightsItem.css";

// --- Interfaces ---
interface HighlightItemData {
  id?: string | number;
  aos?: string;
  icon: React.ReactNode;
  title: string;
  counter: number;
}

interface HighlightsItemProps {
  item: HighlightItemData;
  isMobile: boolean;
  round?: boolean;
  style?: React.CSSProperties;
  itemRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const HighlightsItem: React.FC<HighlightsItemProps> = ({
  item,
  isMobile,
  round,
  itemRef,
}) => {
  return (
    <div
      data-aos={item.aos}
      ref={itemRef}
      className={`${isMobile ? "mobile-highlights-item" : "desktop-highlights-item"} ${round ? "round" : ""}`}
    >
      <i className="highlights-icon-container">{item.icon}</i>

      <CountUp
        from={0}
        to={item.counter}
        separator=","
        direction="up"
        duration={1}
        className="count-up-text"
        startWhen={true}
      />

      <p className="highlights-item-title normal-heading themed-text">
        {item.title}
      </p>
    </div>
  );
};

export default HighlightsItem;
