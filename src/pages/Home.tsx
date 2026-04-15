import Hero from '../components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Trending Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-hedera-purple/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-hedera-cyan uppercase tracking-wider">Crypto</span>
                <span className="text-xs text-gray-500">Ends in 2h 45m</span>
              </div>
              <h3 className="text-lg font-bold mb-4 group-hover:text-hedera-purple transition-colors">
                Will HBAR hit $0.20 by the end of this week?
              </h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-sm">
                  Yes 65%
                </button>
                <button className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all text-sm">
                  No 35%
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
