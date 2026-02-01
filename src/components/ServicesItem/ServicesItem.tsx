import React from "react";
import "./ServicesItem.css";

// --- Interfaces ---
interface ServicesItemData {
  id?: string | number;
  aos?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServicesItemProps {
  item: ServicesItemData;
  isMobile: boolean;
  round?: boolean;
  style?: React.CSSProperties;
  itemRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const ServicesItem: React.FC<ServicesItemProps> = ({
  item,
  isMobile,
  round,
  itemRef,
}) => {
  return (
    <div
      data-aos={item.aos}
      ref={itemRef}
      className={`${isMobile ? "mobile-services-item" : "desktop-services-item"} ${round ? "round" : ""}`}
    >
      <i>{item.icon}</i>

      <h2 className="themed-text">{item.title}</h2>

      <p className="themed-text">{item.description}</p>
    </div>
  );
};

export default ServicesItem;
