import { readFileSync } from 'fs';
import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, '..', 'Testimonials.astro');

describe('Testimonials component', () => {
  it('contiene testimonios en español y nombres esperados', () => {
    const content = readFileSync(filePath, 'utf-8');
    expect(content).toContain('Testimonios');
    expect(content).toContain('María López');
    expect(content).toContain('Carlos Ruiz');
    expect(content).toContain('Ana Pérez');
  });
});
