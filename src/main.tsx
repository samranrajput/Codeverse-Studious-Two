import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import CodeverseCanvas from "./components/CodeverseCanvas/CodeverseCanvas";
import Header from "./components/Header/Header";

AOS.init({
  duration: 3000,
  once: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CodeverseCanvas
      ballSize={7.5}
      logoSize={2.8}
      particleCount={500}
      ringCount={3}
      ringGap={1}
      rotationSpeed={{ x: 0.02, y: 0.03, z: 0.01 }}
      tabletBallSize={6}
      tabletLogoSize={2.5}
      tabletParticleCount={1000}
      mobileBallSize={7}
      mobileLogoSize={3}
      mobileParticleCount={500}
      mobileRingGap={0.7}
    />
    <Header />
    <section id="skills"></section>

    <main></main>
  </StrictMode>,
);
