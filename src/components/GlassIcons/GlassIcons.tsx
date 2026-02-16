import React from "react";
import "./GlassIcons.css";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  link: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  return (
    <div className={`icon-btns ${className || ""}`}>
      {items.map((item, index) => (
        <a
          key={index}
          type="button"
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className={`icon-btn ${item.customClass || ""}`}
          aria-label={item.label}
        >
          <span className="icon-btn__back themed-glass-icon-back"></span>
          <span className="icon-btn__front themed-glass-icon-front">
            <span className="icon-btn__icon themed-main-text" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label themed-text">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default GlassIcons;
