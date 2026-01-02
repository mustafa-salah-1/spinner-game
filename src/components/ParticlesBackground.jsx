import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.5, max: 1 },
      },
      size: {
        value: { min: 2, max: 6 },
      },
      move: {
        enable: true,
        speed: { min: 1, max: 3 },
        direction: "bottom",
        random: false,
        straight: false,
        outModes: {
          default: "out",
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
      },
      wobble: {
        enable: true,
        distance: 10,
        speed: { min: 10, max: 20 },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        resize: {
          enable: true,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
}
