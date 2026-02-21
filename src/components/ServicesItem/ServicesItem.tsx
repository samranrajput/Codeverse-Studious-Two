import React from "react";
import "./ServicesItem.css";

// 1. Item object ka structure define karein
interface ServiceItemData {
  aos?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// 2. Component ke Props ki type define karein
interface ServicesItemProps {
  item: ServiceItemData;
  isMobile: boolean;
  round?: boolean; // Optional prop (?)
  style?: React.CSSProperties;
  itemRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export default function ServicesItem({
  item,
  isMobile,
  round,
  style,
  itemRef,
  className = "", // Default empty string taake undefined class na aaye
}: ServicesItemProps) {
  return (
    <div
      data-aos={item.aos}
      ref={itemRef}
      className={`themed-section-card themed-section-card-shadow ${className} ${
        isMobile ? "mobile-item" : "desktop-item"
      } ${round ? "round" : ""}`.trim()}
      style={style}
    >
      <i className="themed-main-text">{item.icon}</i>

      <h1 className="themed-main-text">{item.title}</h1>

      <p className="themed-main-text">{item.description}</p>

      <div className="holo-swipe themed-holo-swipe"></div>
    </div>
  );
}
