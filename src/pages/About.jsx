export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            About This Project
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          <p className="text-gray-600 leading-relaxed text-base">
            The Control Mapping Engine is a portfolio project that demonstrates how
            security controls from different compliance frameworks — specifically
            ISO 27001, SOC 2, and GDPR — can be cross-referenced and compared.
            In real-world governance, risk, and compliance (GRC) work, organizations
            often need to comply with multiple frameworks simultaneously. This tool
            provides a simplified, interactive way to explore the relationships between
            controls across these frameworks, showing equivalent, partial, and gap
            mappings with reasoning and confidence scores. All data in this tool is
            developer-created and simplified for educational and demonstration purposes.
            It is not sourced from or endorsed by official framework publishers.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-xl p-5 text-center">
            <span className="text-2xl font-bold text-navy">3</span>
            <p className="text-xs text-gray-400 mt-1">Frameworks</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 text-center">
            <span className="text-2xl font-bold text-navy">45</span>
            <p className="text-xs text-gray-400 mt-1">Controls</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 text-center">
            <span className="text-2xl font-bold text-navy">46</span>
            <p className="text-xs text-gray-400 mt-1">Mappings</p>
          </div>
        </div>
      </section>
    </div>
  );
}
