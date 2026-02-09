import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Transition,
  type MotionValue,
} from "framer-motion";
import "./Carousel.css";

// --- Types & Interfaces ---
interface CarouselItem {
  id?: string | number;
  [key: string]: any;
}

interface RenderItemProps {
  item: CarouselItem;
  isMobile: boolean;
  round?: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  round?: boolean;
  renderItem: React.ComponentType<RenderItemProps>;
}

interface CarouselSlideProps {
  index: number;
  x: MotionValue<number>;
  trackItemOffset: number;
  isMeasured: boolean;
  itemRef: React.RefObject<HTMLDivElement | null> | null;
  round?: boolean;
  children: React.ReactNode;
}

// --- Constants ---
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 50,
};

// --- Custom Hook: useMediaQuery ---
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

// --- Desktop List Component ---
const DesktopList: React.FC<CarouselProps> = ({
  items,
  round = false,
  renderItem: ItemComponent,
}) => {
  return (
    <div className="desktop-carousel-container">
      {items.map((item, index) => (
        <ItemComponent
          key={item.id || index}
          item={item}
          isMobile={false}
          round={round}
        />
      ))}
    </div>
  );
};

// --- Sub-component for individual slides (Performance & Hook Rules) ---
const CarouselSlide: React.FC<CarouselSlideProps> = ({
  index,
  x,
  trackItemOffset,
  isMeasured,
  itemRef,
  round,
  children,
}) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];

  // useTransform loop ke andar nahi hona chahiye, isliye ye alag component mein hai
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      ref={itemRef}
      style={{
        rotateY: isMeasured ? rotateY : 0,
        ...(round && { borderRadius: "50%" }),
        willChange: isMeasured ? "transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Mobile Carousel Component ---
const MobileCarousel: React.FC<CarouselProps> = ({
  items,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  round = false,
  renderItem: ItemComponent,
}) => {
  const [measuredItemWidth, setMeasuredItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const numItems = items.length;
  const trackItemOffset = useMemo(
    () => measuredItemWidth + GAP,
    [measuredItemWidth],
  );
  const isMeasured = measuredItemWidth > 0;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === numItems - 1 ? 0 : prev + 1));
  }, [numItems]);

  // Autoplay Logic
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(nextSlide, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, nextSlide]);

  // Resize Observer
  useEffect(() => {
    const currentRef = itemRef.current;
    if (!currentRef) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setMeasuredItemWidth(width);
    });

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, numItems - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div
      data-aos="zoom-in"
      ref={containerRef}
      className={`carousel-container themed-border ${round ? "round" : ""}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      style={{
        visibility: isMeasured ? "visible" : "hidden",
        ...(round && { borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        dragConstraints={{
          left: isMeasured ? -trackItemOffset * (numItems - 1) : 0,
          right: 0,
        }}
        style={{
          width: isMeasured ? measuredItemWidth : "auto",
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + measuredItemWidth / 2}px 50%`,
          x,
          willChange: "transform",
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: isMeasured ? -(currentIndex * trackItemOffset) : 0 }}
        transition={SPRING_OPTIONS}
      >
        {items.map((item, index) => (
          <CarouselSlide
            key={item.id || index}
            index={index}
            x={x}
            trackItemOffset={trackItemOffset}
            isMeasured={isMeasured}
            itemRef={index === 0 ? itemRef : null}
            round={round}
          >
            <ItemComponent item={item} isMobile={true} round={round} />
          </CarouselSlide>
        ))}
      </motion.div>

      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex === index ? "active" : "inactive"}`}
              animate={{ scale: currentIndex === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Carousel Export ---
export default function Carousel(props: CarouselProps) {
  const isMobilePortrait = useMediaQuery(
    "(max-width: 450px) and (orientation: portrait)",
  );

  return isMobilePortrait ? (
    <MobileCarousel {...props} />
  ) : (
    <DesktopList {...props} />
  );
}
