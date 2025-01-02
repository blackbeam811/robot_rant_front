import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { WalletProvider } from "@/utils/WalletContext.tsx";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { DataProvider } from '@/utils/context/DataContext.tsx';
import App from './App.tsx'
import { store } from './store'
import { config } from './lib/config.ts'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <WalletProvider>
              <DataProvider>
                <App />
              </DataProvider>
            </WalletProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </WagmiProvider>
)
