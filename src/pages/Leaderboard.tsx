import { Trophy, Star, TrendingUp, Sparkles } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { rank: 1, address: '0.0.123456', xp: 4500, winRate: '88%' },
  { rank: 2, address: '0.0.852147', xp: 3200, winRate: '75%' },
  { rank: 3, address: '0.0.963258', xp: 2850, winRate: '72%' },
  { rank: 4, address: '0.0.741085', xp: 1900, winRate: '65%' },
  { rank: 5, address: '0.0.159357', xp: 1200, winRate: '60%' },
];

export default function Leaderboard() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <div className="relative mb-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-hedera-purple/10 blur-[80px] rounded-full -z-10" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-hedera-cyan mb-6">
          <Star className="w-3 h-3 fill-hedera-cyan" />
          <span>Top Global Predictors</span>
        </div>
        <h1 className="text-5xl font-extrabold mb-4">The <span className="text-gradient">Leaderboard</span></h1>
        <p className="text-gray-400">Track the most engaged users and their on-chain XP engagement.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {MOCK_LEADERBOARD.slice(0, 3).map((user, idx) => (
          <div key={user.rank} className={`glass p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col items-center ${idx === 0 ? 'md:scale-110 md:-translate-y-2 border-hedera-purple/30' : ''}`}>
            {idx === 0 && <Sparkles className="absolute top-4 right-4 text-hedera-purple w-5 h-5 animate-pulse" />}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${idx === 0 ? 'bg-hedera-purple/20' : 'bg-white/5'}`}>
              {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
            </div>
            <span className="text-xs font-bold text-gray-500 mb-2">{user.address}</span>
            <span className="text-2xl font-black text-white mb-2">{user.xp} XP</span>
            <span className="text-xs font-bold text-hedera-cyan">{user.winRate} WIN RATE</span>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-widest text-gray-500">
            <tr>
              <th className="px-8 py-5">Rank</th>
              <th className="px-8 py-5">Predictor</th>
              <th className="px-8 py-5">Engagement XP</th>
              <th className="px-8 py-5 text-right">Win Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_LEADERBOARD.map((user) => (
              <tr key={user.rank} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <span className={`font-black text-lg ${user.rank === 1 ? 'text-hedera-purple' : 'text-gray-500'}`}>
                    #{user.rank}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">👤</div>
                    <span className="font-bold text-gray-200">{user.address}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-hedera-cyan" />
                    <span className="font-black text-white italic">{user.xp.toLocaleString()} XP</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-gray-400 group-hover:text-hedera-cyan transition-colors">
                    {user.winRate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
