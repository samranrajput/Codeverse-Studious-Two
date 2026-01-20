"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from "react";
import type { ElementType, HTMLAttributes } from "react";
import { gsap } from "gsap";
import "./TextType.css";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  texts?: string[];
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  texts,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  variableSpeedEnabled,
  variableSpeedMin,
  variableSpeedMax,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => {
    const source = texts || text;
    return Array.isArray(source) ? source : [source];
  }, [text, texts]);

  const getRandomSpeed = useCallback(() => {
    const min =
      variableSpeedMin || (variableSpeed ? variableSpeed.min : typingSpeed);
    const max =
      variableSpeedMax || (variableSpeed ? variableSpeed.max : typingSpeed);
    return Math.random() * (max - min) + min;
  }, [variableSpeed, variableSpeedMin, variableSpeedMax, typingSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      const ctx = gsap.context(() => {
        gsap.set(cursorRef.current, { opacity: 1 });
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: cursorBlinkDuration,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      });
      return () => ctx.revert(); // Cleanup GSAP on unmount
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout>;
    const currentText = textArray[currentTextIndex];
    if (!currentText) return;

    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          const speed =
            variableSpeedEnabled || variableSpeed
              ? getRandomSpeed()
              : typingSpeed;
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          }, speed);
        } else {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (
      currentCharIndex === 0 &&
      !isDeleting &&
      displayedText === "" &&
      initialDelay > 0
    ) {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    variableSpeedEnabled,
    onSentenceComplete,
    getRandomSpeed,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex]?.length || 0) ||
      isDeleting);

  return createElement(
    Component as any,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props,
    },
    <span
      className="text-type__content"
      style={{
        color:
          (textColors.length > 0
            ? textColors[currentTextIndex % textColors.length]
            : undefined) || "inherit",
      }}
    >
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
      >
        {cursorCharacter}
      </span>
    ),
  );
};

export default TextType;
