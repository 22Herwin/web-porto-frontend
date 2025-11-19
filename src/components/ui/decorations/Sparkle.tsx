'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface SparkleProps {
  size?: number;
  color?: string;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  rotate?: number;
  opacity?: number;
  delay?: number;
  className?: string;
}

const Sparkle: React.FC<SparkleProps> = ({
  size = 40,
  color = '#000',
  top,
  left,
  right,
  bottom,
  rotate = 0,
  opacity = 1,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        top,
        left,
        right,
        bottom,
        rotate,
        opacity,
        width: size,
        height: size,
      }}
      initial={{ scale: 0.8, opacity: 0.4 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C10.8 3.6 8.4 6 4.8 7.2 8.4 8.4 10.8 10.8 12 14.4 13.2 10.8 15.6 8.4 19.2 7.2 15.6 6 13.2 3.6 12 0Z" />
        <path d="M3 9c0.6 1.8 1.8 3 3.6 3.6C4.8 13.2 3.6 14.4 3 16.2c0.6-1.8 1.8-3 3.6-3.6C4.8 12 3.6 10.8 3 9Z" />
        <path d="M18 9c-0.6 1.8-1.8 3-3.6 3.6 1.8 0.6 3 1.8 3.6 3.6-0.6-1.8-1.8-3-3.6-3.6C16.2 12 17.4 10.8 18 9Z" />
      </svg>
    </motion.div>
  );
};

export default Sparkle;
