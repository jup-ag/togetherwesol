import ClientWalletProvider from '@/components/WalletConnectProvider';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, createStore } from 'jotai';
import type { AppProps } from 'next/app';

import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400' });

const queryClient = new QueryClient();

const myStore = createStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ClientWalletProvider>
          <div className={pressStart2P.className}>
            <Component {...pageProps} />
          </div>
        </ClientWalletProvider>
      </Provider>
    </QueryClientProvider>
  );
}
