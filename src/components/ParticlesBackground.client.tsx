import React from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { particlesOptions } from '../lib/utils';

const ParticlesAny: any = Particles;

export default function ParticlesBackground() {
  // Use any for the engine parameter to avoid requiring the tsparticles-engine type package
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden>
      <ParticlesAny init={particlesInit} options={particlesOptions as any} />
    </div>
  );
}
