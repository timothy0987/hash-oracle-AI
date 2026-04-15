import { useState } from 'react';
import MarketCard from '../components/MarketCard';
import { Globe, Trophy, Bitcoin } from 'lucide-react';

const CATEGORIES = [
  { id: 'crypto', name: 'Crypto', icon: Bitcoin },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'world', name: 'Real-World', icon: Globe },
];

const MARKETS_DATA = {
  crypto: [
    { id: 1, category: 'Crypto', question: 'Will HBAR hit $0.15 by the end of April?', endTime: '2D 4H' },
    { id: 2, category: 'Crypto', question: 'Will BTC hit $100k before the next halving?', endTime: '12D 1H' },
    { id: 3, category: 'Crypto', question: 'Will ETH outperform BTC in the next 24 hours?', endTime: '18H 22M' },
  ],
  sports: [
    { id: 4, category: 'Sports', question: 'Will Mexico reach the Quarter-Finals in 2026?', endTime: '420D 4H' },
    { id: 5, category: 'Sports', question: 'Will Argentina win the 2024 Copa América?', endTime: '2D 1H' },
    { id: 6, category: 'Sports', question: 'Will Lakers qualify for the NBA Play-ins?', endTime: '5H 12M' },
  ],
  world: [
    { id: 7, category: 'Politics', question: 'Will the 2028 Olympics be held in Los Angeles?', endTime: '800D 10H' },
    { id: 8, category: 'Tech', question: 'Will OpenAI release GPT-5 by December 2026?', endTime: '200D 5H' },
    { id: 9, category: 'Climate', question: 'Will global average temp increase by 1.5°C by 2030?', endTime: '1500D 2H' },
  ],
};

export default function Markets() {
  const [activeTab, setActiveTab] = useState<keyof typeof MARKETS_DATA>('crypto');

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-white">Prediction <span className="text-gradient">Markets</span></h1>
          <p className="text-gray-400 max-w-md">Predict global outcomes using Hedera Hashgraph and earn rewards in HBAR.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 gap-2">
          {CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id ? 'bg-hedera-purple text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MARKETS_DATA[activeTab].map((market) => (
          <MarketCard key={market.id} {...market} />
        ))}
      </div>
    </div>
  );
}
