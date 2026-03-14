import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function ProjectModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-project-modal', handler as EventListener);
    return () => window.removeEventListener('open-project-modal', handler as EventListener);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 bg-bg-elevated border border-border rounded-3xl">
          <Dialog.Title className="text-xl font-mont mb-2">Iniciar proyecto</Dialog.Title>
          <Dialog.Description className="text-text-muted mb-6">Cuéntanos sobre tu idea y nos pondremos en contacto.</Dialog.Description>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 bg-bg-surface border border-border rounded-lg w-full" placeholder="Nombre" />
              <input className="p-3 bg-bg-surface border border-border rounded-lg w-full" placeholder="Empresa" />
            </div>
            <input className="p-3 bg-bg-surface border border-border rounded-lg w-full" placeholder="Email" />
            <textarea className="p-3 bg-bg-surface border border-border rounded-lg w-full" placeholder="Descripción del proyecto" rows={5} />
            <select className="p-3 bg-bg-surface border border-border rounded-lg w-full">
              <option>Presupuesto aproximado</option>
              <option>€5k - €25k</option>
              <option>€25k - €100k</option>
              <option>€100k+</option>
            </select>
            <div className="flex items-center justify-between gap-4">
              <button type="button" className="px-4 py-3 rounded-2xl bg-[color:var(--accent)] w-full">Enviar</button>
              <button type="button" className="px-4 py-3 rounded-2xl border border-border w-full" onClick={() => setOpen(false)}>Cancelar</button>
            </div>
          </form>

          <Dialog.Close className="sr-only">Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
