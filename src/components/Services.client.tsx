import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

const tabs = [
  { key: 'factory', title: 'Software Factory', bullets: ['Equipo dedicado', 'Sprints predefinidos', 'Infraestructura como código'] },
  { key: 'custom', title: 'Custom Software', bullets: ['Arquitectura a medida', 'QA y seguridad', 'Entrega escalable'] },
  { key: 'mobile', title: 'Web & Mobile', bullets: ['React Native / Expo', 'PWA', 'UX optimizado'] },
  { key: 'integrations', title: 'Integrations', bullets: ['APIs robustas', 'Event-driven', 'ETL & Sync'] },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-mont">What We Build</motion.h2>

        <Tabs.Root defaultValue="factory" className="mt-6">
          <Tabs.List className="flex gap-4 mb-6">
            {tabs.map((t) => (
              <Tabs.Trigger key={t.key} value={t.key} className="px-4 py-2 rounded-full border border-border bg-bg-surface text-sm">{t.title}</Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map((t) => (
            <Tabs.Content key={t.key} value={t.key} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-bg-surface border border-border rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">{t.title}</h3>
                <p className="text-text-muted mb-4">Soluciones pensadas para CTOs y fundadores que necesitan entregas rápidas y sostenibles.</p>
                <ul className="space-y-2 mb-4">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm"> <span className="text-[color:var(--accent)]">•</span> {b}</li>
                  ))}
                </ul>
                <a className="text-sm text-[color:var(--accent)]" href="#">Learn more →</a>
              </div>

              <div className="bg-bg-surface border border-border rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-semibold">Casos</div>
                  <div className="text-text-muted text-sm">Ejemplos reales y resultados.</div>
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
