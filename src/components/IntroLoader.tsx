import { useEffect } from "react";
import bulb from "../assets/bulb.svg";
import spinner from "../assets/spinner.svg";
import "./IntroLoader.css";

interface IntroLoaderProps {
  onComplete?: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
  <>
    <div className="intro-loader" />

    <div className="intro-logo">
      <img src={bulb} alt="" className="intro-bulb" />
      <img src={spinner} alt="" className="intro-spinner" />
    </div>
  </>
);
}