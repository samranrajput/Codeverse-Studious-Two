import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./SkillsNetwork.css";

export const SkillsNetwork = ({ centerName, skills }: any) => {
  const [dims, setDims] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const isM = dims.w < 768;
  const radX = isM ? dims.w * 0.35 : dims.w * 0.38;
  const radY = isM ? dims.h * 0.4 : dims.h * 0.28;

  const renderIcon = (icon: any) => {
    if (typeof icon === "string") return <i className={icon}></i>;
    return icon;
  };

  return (
    <div className="skills-network-container">
      <svg className="network-svg">
        {skills.map((_: any, i: number) => {
          const ang = (i / skills.length) * Math.PI * 2;
          const x = dims.w / 2 + Math.cos(ang) * radX;
          const y = dims.h / 2 + Math.sin(ang) * radY;
          const cpX = dims.w / 2 + Math.cos(ang + 0.2) * (radX * 0.5);
          const cpY = dims.h / 2 + Math.sin(ang - 0.2) * (radY * 0.5);
          return (
            <g key={i}>
              <path
                d={`M ${x} ${y} Q ${cpX} ${cpY} ${dims.w / 2} ${dims.h / 2}`}
                className="base-line"
              />
              <motion.path
                d={`M ${x} ${y} Q ${cpX} ${cpY} ${dims.w / 2} ${dims.h / 2}`}
                className="pulse-line"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              />
            </g>
          );
        })}
      </svg>

      <div className="center-node">{centerName}</div>

      {skills.map((skill: any, i: number) => {
        const ang = (i / skills.length) * Math.PI * 2;
        const x = dims.w / 2 + Math.cos(ang) * radX;
        const y = dims.h / 2 + Math.sin(ang) * radY;
        const circum = 2 * Math.PI * 35;
        const offset = circum - (skill.percent / 100) * circum;

        return (
          <div
            key={skill.name}
            className="skill-node-wrapper"
            style={{ left: x, top: y }}
          >
            <svg className="progress-svg">
              <circle cx="40" cy="40" r="35" className="progress-bg" />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                className="progress-bar"
                strokeDasharray={circum}
                initial={{ strokeDashoffset: circum }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5 }}
              />
            </svg>
            <div className="node-text">
              <div className="icon-wrapper">{renderIcon(skill.icon)}</div>
              <span>{skill.name}</span>
              <span className="percent">{skill.percent}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
