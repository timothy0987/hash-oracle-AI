import { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useWriteContract, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { HASH_ORACLE_ABI, CONTRACT_CONFIG } from '../config/contractConfig';

interface MarketCardProps {
  id: number;
  category: string;
  question: string;
  endTime: string;
  isOverUnder?: boolean;
}

export default function MarketCard({ id, category, question, endTime }: MarketCardProps) {
  const [stake, setStake] = useState<string>('5');
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { isConnected } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handlePredict = (side: boolean) => {
    setError(null);
    const amount = parseFloat(stake);
    
    // Strict Validation
    if (amount < 5 || amount > 50) {
      setError('Stake must be between 5 and 50 HBAR');
      return;
    }

    setPrediction(side);
    
    writeContract({
      address: CONTRACT_CONFIG.HASH_ORACLE_PROXY_TESTNET as `0x${string}`,
      abi: HASH_ORACLE_ABI,
      functionName: 'predict',
      args: [BigInt(id), side],
      value: parseUnits(stake, 8), // Hedera HBAR has 8 decimals
    });
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-hedera-purple/30 transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-hedera-cyan uppercase tracking-widest">{category}</span>
        <span className="text-[10px] text-gray-500 font-medium">ENDS IN {endTime}</span>
      </div>

      <h3 className="text-lg font-bold mb-6 min-h-[3.5rem] leading-tight group-hover:text-white transition-colors">
        {question}
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            disabled={isPending || isSuccess}
            placeholder="Stake Amount (HBAR)"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hedera-purple/50 transition-all pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">HBAR</span>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs animate-pulse">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
            <CheckCircle2 className="w-3 h-3" />
            Prediction locked successfully!
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => handlePredict(true)}
            disabled={!isConnected || isPending || isSuccess}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              prediction === true && isPending ? 'bg-hedera-purple/50 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPending && prediction === true ? <Loader2 className="w-4 h-4 animate-spin" /> : 'YES'}
          </button>
          <button
            onClick={() => handlePredict(false)}
            disabled={!isConnected || isPending || isSuccess}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              prediction === false && isPending ? 'bg-hedera-purple/50 cursor-not-allowed' : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPending && prediction === false ? <Loader2 className="w-4 h-4 animate-spin" /> : 'NO'}
          </button>
        </div>
        
        {!isConnected && (
          <p className="text-[10px] text-gray-500 text-center italic">Connect your wallet to predict</p>
        )}
      </div>

      {/* Card Decoration */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-hedera-purple/5 blur-[40px] rounded-full group-hover:bg-hedera-purple/10 transition-all" />
    </div>
  );
}
