import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/SplineScene.css';

const SplineScene = () => {
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext); // ✅ get current theme
  const labelColor = theme === 'dark' ? '#ffffff' : '#1f2937'; // ✅ adaptive text color

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let animationFrame;
    let time = 0;

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const shapes = [
        { x: 150, y: 100, size: 30, rotation: time * 0.01 },
        { x: 300, y: 200, size: 25, rotation: time * -0.015 },
        { x: 100, y: 250, size: 35, rotation: time * 0.008 },
        { x: 250, y: 150, size: 20, rotation: time * -0.012 },
        { x: 200, y: 300, size: 28, rotation: time * 0.009 }
      ];

      shapes.forEach((shape, index) => {
        ctx.save();
        ctx.translate(
          shape.x + Math.sin(time * 0.002 + index) * 10,
          shape.y + Math.cos(time * 0.003 + index) * 15
        );
        ctx.rotate(shape.rotation);

        const colors = [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(139, 92, 246, 0.7)'
        ];

        ctx.fillStyle = colors[index % colors.length];

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * shape.size;
          const y = Math.sin(angle) * shape.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * shape.size + 5;
          const y = Math.sin(angle) * shape.size + 5;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(shapes[i].x - shapes[j].x, 2) +
              Math.pow(shapes[i].y - shapes[j].y, 2)
          );
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }

      time += 1;
      animationFrame = requestAnimationFrame(drawScene);
    };

    drawScene();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="spline-wrapper">
      <div className="spline-background">
        <motion.div
          className="spline-bubble spline-bubble1"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="spline-bubble spline-bubble2"
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="spline-bubble spline-bubble3"
          animate={{ x: [0, 60, 0], y: [0, -80, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      <motion.canvas
        ref={canvasRef}
        className="spline-canvas"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.div
        className="spline-label top-left"
        style={{ color: 'black' }} // ✅ dynamic color
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        📚 Interactive Learning
      </motion.div>

      <motion.div
        className="spline-label bottom-right"
        style={{ color: 'black' }} // ✅ dynamic color
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        🎯 Achieve Goals
      </motion.div>
    </div>
  );
};

export default SplineScene;
