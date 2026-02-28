import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Components Imports
import CodeverseCanvas from "./components/CodeverseCanvas/CodeverseCanvas";
import ConfettiCanvas from "./components/ConfettiCanvas/ConfettiCanvas";
// Yahan hum interface ko 'type' ke sath mangwa rahe hain taake TS error na de
import type { ConfettiRef } from "./components/ConfettiCanvas/ConfettiCanvas";

import Header from "./components/Header/Header";
import About from "./components/About/About";
import Highlights from "./components/Highlights/Highlights";
import Services from "./components/Services/Services";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import ClientReviews from "./components/ClientReviews/ClientReviews";

const App = () => {
  // 1. Ref initialize karein aur type specify karein
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });

    const handleLoad = () => AOS.refresh();
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {/* 2. Codeverse Background Animation */}
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

      {/* 3. Confetti Canvas - Isme hum ref pass kar rahe hain */}
      <ConfettiCanvas duration={3000} ref={confettiRef} />

      <Header />

      <main>
        <About />
        <Highlights />
        <Services />
        <Skills />
        <Projects />

        {/* 4. ClientReviews - Yahan hum ref bhej rahe hain taake success par fire ho sake */}
        <ClientReviews confettiRef={confettiRef} />
      </main>
    </>
  );
};

export default App;
