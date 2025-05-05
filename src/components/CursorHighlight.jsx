import React, { useEffect, useState } from "react";

const CursorHighlight = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Base style for positioning using transform
  const baseStyle = {
    position: "fixed",
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -50%)', // Center the element
    pointerEvents: "none",
    borderRadius: "9999px",
    transition: 'transform 0.1s ease-out, background-color 0.1s ease-out, border-color 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out', // Smooth transitions for scale etc.
  };

  return (
    <>
      {/* Outer Ring - Softer Red/Pink, Blur Backdrop */}
      <div
        className={`fixed pointer-events-none rounded-full border-2 border-rose-400/70 backdrop-blur-[1px] z-[9999] transition-transform duration-200 ease-out ${
          isMouseDown ? 'w-[35px] h-[35px]' : 'w-[30px] h-[30px]' // Slightly larger on click
        }`}
        style={{
          ...baseStyle,
          top: position.y, // Apply position directly
          left: position.x,
          // width/height handled by classes now
          // backdropFilter: 'blur(1px)' // Tailwind backdrop-blur applies this
        }}
      />
      {/* Inner Dot - Softer Red, Slightly Larger */}
      <div
        className={`fixed pointer-events-none rounded-full bg-rose-500 z-[10000] transition-transform duration-100 ease-out ${
          isMouseDown ? 'w-2.5 h-2.5' : 'w-2 h-2' 
        }`}
        style={{
          ...baseStyle,
          top: position.y, 
          left: position.x,
          
        }}
      />
    </>
  );
};

export default CursorHighlight;