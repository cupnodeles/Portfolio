import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  trail: { x: number; y: number }[];
}

const STAR_COLORS = [
  "#ffffff",
  "#ccd6f6",
  "#a8b2d8",
  "#b39ddb",
  "#80cbc4",
  "#ce93d8",
  "#90caf9",
];

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create stars
    const numStars = Math.floor((width * height) / 3000);
    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.3,
      opacity: Math.random(),
      speed: Math.random() * 0.05 + 0.005,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));

    // Shooting stars
    const shootingStars: ShootingStar[] = Array.from({ length: 5 }, () =>
      createShootingStar(width, height)
    );

    function createShootingStar(w: number, h: number): ShootingStar {
      return {
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 12 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
        opacity: 0,
        active: false,
        trail: [],
      };
    }

    let time = 0;

    // Schedule shooting star
    function scheduleShootingStar(s: ShootingStar, w: number, h: number) {
      s.x = Math.random() * w * 0.6;
      s.y = Math.random() * h * 0.4;
      s.len = Math.random() * 150 + 80;
      s.speed = Math.random() * 14 + 8;
      s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      s.opacity = 1;
      s.active = true;
      s.trail = [];
    }

    // Randomly activate shooting stars
    shootingStars.forEach((s, i) => {
      setTimeout(() => {
        scheduleShootingStar(s, width, height);
      }, Math.random() * 5000 + i * 2000);
    });

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Draw nebula/galaxy glow layers
      drawNebula(ctx!, width, height, mouseRef.current);

      // Draw stars
      time += 0.016;
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(star.twinklePhase));
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx!.fillStyle = star.color;
        ctx!.globalAlpha = twinkle * star.opacity;

        // Glow effect for larger stars
        if (star.size > 1.5) {
          const grd = ctx!.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          grd.addColorStop(0, star.color);
          grd.addColorStop(1, "transparent");
          ctx!.fillStyle = grd;
          ctx!.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        }

        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      // Draw shooting stars
      shootingStars.forEach((s) => {
        if (!s.active) return;

        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 20) s.trail.shift();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.012;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
          s.opacity = 0;
          setTimeout(() => {
            scheduleShootingStar(s, width, height);
          }, Math.random() * 6000 + 3000);
          return;
        }

        // Draw trail
        for (let i = 0; i < s.trail.length; i++) {
          const t = i / s.trail.length;
          ctx!.beginPath();
          ctx!.moveTo(s.trail[i].x, s.trail[i].y);
          if (i + 1 < s.trail.length) {
            ctx!.lineTo(s.trail[i + 1].x, s.trail[i + 1].y);
          }
          ctx!.strokeStyle = `rgba(255, 255, 255, ${t * s.opacity})`;
          ctx!.lineWidth = t * 2;
          ctx!.stroke();
        }

        // Draw head glow
        const grd = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, 8);
        grd.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grd.addColorStop(1, "transparent");
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 8, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    function drawNebula(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mouse: { x: number; y: number }
    ) {
      const mx = mouse.x / w;
      const my = mouse.y / h;

      // Static nebula blobs
      const nebulaPoints = [
        { x: w * 0.2, y: h * 0.3, r: w * 0.35, color: "rgba(120,40,200,0.08)" },
        { x: w * 0.8, y: h * 0.2, r: w * 0.3, color: "rgba(30,100,200,0.07)" },
        { x: w * 0.5, y: h * 0.7, r: w * 0.4, color: "rgba(200,50,150,0.06)" },
        { x: w * 0.1, y: h * 0.8, r: w * 0.25, color: "rgba(0,180,180,0.05)" },
        { x: w * 0.9, y: h * 0.9, r: w * 0.3, color: "rgba(80,0,180,0.07)" },
      ];

      nebulaPoints.forEach((n) => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grd.addColorStop(0, n.color);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Mouse-following nebula
      if (mouse.x > 0 && mouse.y > 0) {
        const mgrd = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 200
        );
        mgrd.addColorStop(0, "rgba(150,80,255,0.12)");
        mgrd.addColorStop(0.5, "rgba(80,40,180,0.06)");
        mgrd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fillStyle = mgrd;
        ctx.fill();
      }
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
