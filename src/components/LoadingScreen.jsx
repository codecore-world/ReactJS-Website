import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const TEXT = 'CODECORE.world';
const TYPE_SPEED = 40; // rapide
const ERASE_SPEED = 18; // très rapide
const PAUSE_AFTER_TYPE = 350;

export default function LoadingScreen({ onFinish }) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pause' | 'erasing' | 'done'

  useEffect(() => {
    let timeouts = [];
    if (phase === 'typing') {
      for (let i = 0; i <= TEXT.length; i++) {
        timeouts.push(setTimeout(() => {
          setDisplayed(TEXT.slice(0, i));
          if (i === TEXT.length) setPhase('pause');
        }, i * TYPE_SPEED));
      }
    } else if (phase === 'pause') {
      timeouts.push(setTimeout(() => setPhase('erasing'), PAUSE_AFTER_TYPE));
    } else if (phase === 'erasing') {
      for (let i = TEXT.length; i >= 0; i--) {
        timeouts.push(setTimeout(() => {
          setDisplayed(TEXT.slice(0, i));
          if (i === 0) setPhase('done');
        }, (TEXT.length - i) * ERASE_SPEED));
      }
    } else if (phase === 'done') {
      if (onFinish) onFinish();
    }
    return () => timeouts.forEach(clearTimeout);
  }, [phase, onFinish]);

  return (
    <div className="loading-neon-bg">
      <div className="loading-typewriter">
        <span className="simple-text">{displayed}</span>
      </div>
    </div>
  );
} 