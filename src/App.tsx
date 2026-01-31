import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Components
import CodeverseCanvas from "./components/CodeverseCanvas/CodeverseCanvas";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Highlights from "./components/Highlights/Highlights";
import Services from "./components/Services/Services";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
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

      <main>
        <About />

        <Highlights />

        <Services />
      </main>
    </>
  );
};

export default App;
