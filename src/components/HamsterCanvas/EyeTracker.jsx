import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EyeTracker({ mousePos, focusedField, cx, cy }) {
  const eyeRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (focusedField === 'email') {
      setPupilOffset({ x: 2.5, y: 2.5 });
      return;
    }

    if (eyeRef.current) {
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
      const distance = Math.min(
        3.5,
        Math.hypot(mousePos.x - eyeCenterX, mousePos.y - eyeCenterY) / 45
      );

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    }
  }, [mousePos, focusedField]);

  return (
    <g ref={eyeRef}>
      <circle cx={cx} cy={cy} r="9.5" fill="#4a4252" />
      <motion.g
        animate={{ x: pupilOffset.x, y: pupilOffset.y }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <circle cx={cx + 0.5} cy={cy + 0.5} r="6.5" fill="#362f3d" />
        <circle cx={cx - 3} cy={cy - 3} r="2.8" fill="#ffffff" />
        <circle cx={cx + 2.5} cy={cy + 2.5} r="1.3" fill="#ffffff" />
      </motion.g>
    </g>
  );
}