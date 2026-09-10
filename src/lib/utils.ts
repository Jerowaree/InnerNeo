import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export const getCurrentYear = () => new Date().getFullYear();

export const particlesOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 45 },
    color: { value: ['#4D49B9', '#25245A'] },
    shape: { type: 'circle' },
    opacity: { value: 0.35 },
    size: { value: { min: 1, max: 4 } },
    links: { enable: true, color: '#4D49B9', opacity: 0.12, distance: 140 },
    move: { enable: true, speed: 1, random: true, outMode: 'bounce' },
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: false },
      resize: true,
    },
    modes: { repulse: { distance: 120 } },
  },
  detectRetina: true,
};
