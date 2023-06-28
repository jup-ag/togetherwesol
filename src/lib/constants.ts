import { Connection } from '@solana/web3.js';
import { TokenInfo } from './types';

export const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || 'https://jupiter.rpcpool.com');

export const SOL_TOKEN_INFO: TokenInfo = {
  address: 'So11111111111111111111111111111111111111112',
  chainId: 101,
  decimals: 9,
  name: 'Wrapped SOL',
  symbol: 'SOL',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  tags: ['old-registry'],
  extensions: {
    coingeckoId: 'wrapped-solana',
  },
};

export const USDC_TOKEN_INFO: TokenInfo = {
  address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  chainId: 101,
  decimals: 6,
  name: 'USD Coin',
  symbol: 'USDC',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  tags: ['old-registry'],
  extensions: {
    coingeckoId: 'usd-coin',
  },
};
