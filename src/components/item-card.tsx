import { useEffect, useRef } from "react";

// ... inside your ItemCard component:

const shineRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (shineRef.current) {
    shineRef.current.animate(
      [
        { backgroundPosition: "-200% 0" },
        { backgroundPosition: "200% 0" }
      ],
      {
        duration: 3000,
        iterations: Infinity,
        easing: "linear"
      }
    );
  }
}, []);

// ... in your return statement:
<div 
  ref={shineRef}
  className="absolute inset-0 z-10"
  style={{
    backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
    backgroundSize: "200% 100%",
  }}
/>
