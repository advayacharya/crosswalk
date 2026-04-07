export default function About() {
  return (
    <div className="min-h-screen surface-base">
      <section className="surface-low border-b border-stone-high py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-obsidian tracking-tighter">
            Architectural <span className="text-primary italic">Statement.</span>
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
        <div className="bg-white ghost-border rounded-3xl p-10 sm:p-16 shadow-sm shadow-obsidian/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8">Purpose & Vision</h2>
            <p className="text-obsidian text-xl font-medium leading-relaxed mb-8">
              The Sovereign Crosswalk is a high-precision registry designed to harmonize the fragmented landscape of global security compliance. 
            </p>
            <p className="text-steel text-lg font-medium leading-relaxed mb-10">
              In an era of regulatory proliferation, organizations often find themselves struggling with overlapping requirements from ISO 27001, SOC 2, and GDPR. This engine provides a forensic-grade interface to map these framework architectures—identifying structural equivalencies, partial alignments, and critical gaps with institutional clarity.
            </p>
            
            <div className="border-t border-stone-low pt-10">
              <h3 className="text-xs font-bold text-steel uppercase tracking-widest mb-4">Disclaimer & Methodology</h3>
              <p className="text-steel text-sm font-medium leading-relaxed italic">
                "All data in this ledger is conceptually derived and simplified for architectural demonstration. This tool is a portfolio asset and does not constitute official certification advice or legal council. No data has been directly sourced from official publication texts; mappings are based on public study materials."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white ghost-border rounded-2xl p-8 text-center shadow-sm">
            <span className="text-4xl font-black text-obsidian block mb-2 tracking-tighter">03</span>
            <p className="text-[10px] font-bold text-steel uppercase tracking-widest">Registries</p>
          </div>
          <div className="bg-white ghost-border rounded-2xl p-8 text-center shadow-sm">
            <span className="text-4xl font-black text-obsidian block mb-2 tracking-tighter">45</span>
            <p className="text-[10px] font-bold text-steel uppercase tracking-widest">Identified Controls</p>
          </div>
          <div className="bg-white ghost-border rounded-2xl p-8 text-center shadow-sm">
            <span className="text-4xl font-black text-obsidian block mb-2 tracking-tighter">46</span>
            <p className="text-[10px] font-bold text-steel uppercase tracking-widest">Logical Mappings</p>
          </div>
        </div>
      </section>
    </div>
  );
}
