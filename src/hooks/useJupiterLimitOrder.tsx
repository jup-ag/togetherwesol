import { Connection } from '@solana/web3.js';
import { useMemo } from 'react';
import { LimitOrderProvider } from '@jup-ag/limit-order-sdk';

export const useJupiterLimitOrder = (connection: Connection) => {
  return useMemo(() => {
    return new LimitOrderProvider(connection);
  }, [connection]);
};
