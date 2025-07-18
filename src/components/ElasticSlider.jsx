import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import './ElasticSlider.css';

const MAX_OVERFLOW = 100; // Augmenté pour plus d'élasticité

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = "",
  isStepped = false,
  stepSize = 1,
  leftIcon = <VolumeX size={20} />,
  rightIcon = <Volume2 size={20} />,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = defaultValue / 100;
      
      audio.addEventListener('error', (e) => {
        console.log('Audio error:', e);
      });

      audio.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
      });
    }
  }, []);

  const handleVolumeChange = (newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
      
      if (newValue === 0) {
        setIsMuted(true);
        setIsPlaying(false);
        audioRef.current.pause();
      } else if (isMuted) {
        setIsMuted(false);
        setIsPlaying(true);
        audioRef.current.play().catch((error) => {
          console.log('Playback failed:', error);
        });
      }
    }
  };

  return (
    <div className={`slider-container ${className}`}>
      <audio
        ref={audioRef}
        src="/background.mp3"
        preload="auto"
      />
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onValueChange={handleVolumeChange}
      />
    </div>
  );
}

function Slider({
  defaultValue,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
  onValueChange,
}) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef(null);
  const [region, setRegion] = useState("middle");
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);

  useMotionValueEvent(clientX, "change", (latest) => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion("left");
        newValue = left - latest;
      } else if (latest > right) {
        setRegion("right");
        newValue = latest - right;
      } else {
        setRegion("middle");
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = (e) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = (e) => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: "spring", bounce: 0.5 });
  };

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;

    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.05)} // Réduit le hover
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.05)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.05], [0.8, 1]), // Ajusté pour le nouveau scale
        }}
        className="slider-wrapper"
      >
        {leftIcon && (
          <motion.div
            animate={{
              scale: region === "left" ? [1, 1.4, 1] : 1,
              transition: { duration: 0.25 },
            }}
            style={{
              x: useTransform(() =>
                region === "left" ? -overflow.get() / scale.get() : 0,
              ),
            }}
          >
            {leftIcon}
          </motion.div>
        )}

        <div
          ref={sliderRef}
          className="slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.7]), // Plus d'élasticité
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? "right" : "left";
                }
              }),
              height: useTransform(scale, [1, 1.05], [6, 10]), // Ajusté pour le nouveau scale
              marginTop: useTransform(scale, [1, 1.05], [0, -2]),
              marginBottom: useTransform(scale, [1, 1.05], [0, -2]),
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track">
              <div
                className="slider-range"
                style={{ width: `${getRangePercentage()}%` }}
              />
            </div>
          </motion.div>
        </div>

        {rightIcon && (
          <motion.div
            animate={{
              scale: region === "right" ? [1, 1.4, 1] : 1,
              transition: { duration: 0.25 },
            }}
            style={{
              x: useTransform(() =>
                region === "right" ? overflow.get() / scale.get() : 0,
              ),
            }}
          >
            {rightIcon}
          </motion.div>
        )}
      </motion.div>
      <p className="value-indicator">{Math.round(value)}</p>
    </>
  );
}

function decay(value, max) {
  if (max === 0) {
    return 0;
  }

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
} 