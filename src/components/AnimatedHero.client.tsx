import React from 'react';

export default function AnimatedHero() {
  return (
    <div className="relative z-10">
      {/* Intentional Designer Marker */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-[#612DAA]/30" />
        <span className="font-mono-dm text-[11px] uppercase tracking-[0.3em] text-[#612DAA] font-semibold">
          Estudio de Ingeniería Digital
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-mont font-bold leading-[0.9] tracking-[-0.04em] text-[#0F0F1A]">
        Diseñamos <br />
        <span className="relative">
          el Futuro
          <span className="absolute -bottom-2 left-0 h-[4px] bg-gradient-to-r from-[#612DAA] to-transparent rounded-full opacity-20 w-full" />
        </span>
      </h1>

      <div className="mt-12 flex flex-col md:flex-row md:items-end gap-12">
        <p className="text-xl md:text-2xl text-[#64748B] max-w-xl leading-relaxed font-medium">
          Transformamos <span className="text-[#0F0F1A]">visiones ambiciosas</span> en software de precisión. Elevamos el estándar digital a través de la ingeniería de vanguardia.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#F0F2F7] flex items-center justify-center text-[10px] font-bold text-[#64748B]">
                  LR
                </div>
              ))}
            </div>
            <div className="text-xs font-medium text-[#64748B]">
              <span className="text-[#0F0F1A] font-bold">+20 proyectos</span> entregados este año
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-6">
        <button 
          className="group relative px-10 py-5 rounded-2xl bg-[#0F0F1A] text-white font-bold text-lg overflow-hidden transition-all shadow-2xl shadow-black/10 hover:shadow-purple-500/20"
          onClick={() => window.dispatchEvent(new CustomEvent('open-project-modal'))}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#612DAA] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <span className="relative flex items-center gap-3">
            Hablemos de tu proyecto
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
        
        <button className="px-6 py-4 rounded-xl text-[#0F0F1A] font-bold flex items-center gap-3 group transition-premium">
          <span className="w-10 h-10 rounded-full border border-[color:var(--border)] flex items-center justify-center group-hover:bg-[#0F0F1A] group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </span>
          Explorar Portafolio
        </button>
      </div>

      {/* Sophisticated Terminal / Tech Proof */}
      <div className="mt-24 relative max-w-2xl group">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#612DAA]/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative bg-white border border-[color:var(--border)] rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-xl transition-premium overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="M2 12h20"/><path d="m4.93 19.07 14.14-14.14"/></svg>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="font-mono-dm text-[10px] text-[#64748B] tracking-widest uppercase">
              Build Status: Stable
            </div>
          </div>

          <div className="space-y-4 font-mono-dm text-sm leading-relaxed">
            <div className="flex gap-4">
              <span className="text-[#612DAA] opacity-40">01</span>
              <span className="text-[#64748B]">const <span className="text-[#0F0F1A] font-bold">stack</span> = ['Next.js', 'Astro', 'TypeScript'];</span>
            </div>
            <div className="flex gap-4">
              <span className="text-[#612DAA] opacity-40">02</span>
              <span className="text-[#64748B]">engineer(<span className="text-[#612DAA]">solution</span>) <span className="text-emerald-500 font-bold">=&gt; success;</span></span>
            </div>
            <div className="mt-6 pt-6 border-t border-dashed border-[#DEE3ED]">
               <div className="flex items-center gap-3 text-[#0F0F1A]">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="font-bold">Sistemas escalables listos para despegar.</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
