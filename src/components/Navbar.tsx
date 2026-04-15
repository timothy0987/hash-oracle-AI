import { Wallet, TrendingUp, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/10">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-hedera-purple flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white italic">
          Hash<span className="text-hedera-purple">Oracle</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/markets" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Markets
        </Link>
        <Link to="/leaderboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Leaderboard
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => open()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <Wallet className="w-4 h-4 text-hedera-cyan group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
          </span>
        </button>
        <button className="md:hidden">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
    </nav>
  );
}
