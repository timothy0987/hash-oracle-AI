import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-24 px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-hedera-purple/20 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-hedera-cyan mb-6 animate-pulse">
          <Sparkles className="w-3 h-3" />
          <span>Built on Hedera Testnet</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          The Future of <span className="text-gradient">Prediction Markets</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Predict global events, crypto trends, and more with lightning speed and ultra-low fees on Hashgraph.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/markets" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-hedera-purple hover:bg-hedera-purple/90 text-white font-bold transition-all flex items-center justify-center gap-2 group">
            Explore Markets
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all">
            How it Works
          </button>
        </div>
      </div>
    </div>
  );
}
