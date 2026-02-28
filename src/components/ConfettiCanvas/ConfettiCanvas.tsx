import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

import "./ConfettiCanvas.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  spin: number;
  life: number;
}

export interface ConfettiRef {
  fire: () => void;
}

// Props mein duration add ki (milliseconds mein)
interface ConfettiProps {
  duration?: number;
}

const ConfettiCanvas = forwardRef<ConfettiRef, ConfettiProps>(
  ({ duration = 2000 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particles = useRef<Particle[]>([]);
    const [showText, setShowText] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      fire() {
        const colors = ["#ff4d4f", "#e7c27d", "#560000", "#ffffff"];
        setShowText(true);

        // Particles ki life duration ke hisaab se (60fps ke liye)
        // Agar duration 2000ms hai toh life takreeban 120 frames hogi
        const particleLife = (duration / 1000) * 60;

        for (let i = 0; i < 150; i++) {
          particles.current.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 15,
            speedY: Math.random() * -15 - 5,
            rotation: Math.random() * 360,
            spin: (Math.random() - 0.5) * 10,
            life: particleLife,
          });
        }

        // Dynamic duration khatam hone par text hide karein
        setTimeout(() => {
          setShowText(false);
        }, duration);
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrame: number;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", resize);
      resize();

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.current = particles.current.filter((p) => p.life > 0);

        particles.current.forEach((p) => {
          p.speedY += 0.4;
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.spin;
          p.life--;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrame);
      };
    }, []);

    return (
      <>
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
        {showText && (
          <div
            className="thank-you-message"
            style={{ animationDuration: `${duration}ms` }} // CSS animation duration control
          >
            Thank You for submitting Review!
          </div>
        )}
      </>
    );
  },
);

export default ConfettiCanvas;
