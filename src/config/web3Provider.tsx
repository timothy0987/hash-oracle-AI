import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, type Chain } from 'wagmi'
import React from 'react'

// 1. Get projectId
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'ee5320f37a3100299823a38ca4b33e58'

// 2. Define Hedera Testnet Chain (EVM Compatible)
const hederaTestnet: Chain = {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 8 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_HEDERA_RPC_URL || 'https://testnet.hashio.io/v1/testnet'] },
  },
  blockExplorers: {
    default: { name: 'Hashscan', url: 'https://hashscan.io/testnet' },
  },
}

// 3. Create Wagmi Adapter
const networks = [hederaTestnet]
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// 4. Create AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'HashOracle',
    description: 'Hedera Prediction Markets',
    url: 'https://hashoracle.io',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  }
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
