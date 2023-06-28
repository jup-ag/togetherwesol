import { useQuery } from '@tanstack/react-query';
import Decimal from 'decimal.js';

interface PriceResponse {
  data: {
    SOL: {
      id: 'So11111111111111111111111111111111111111112';
      mintSymbol: 'SOL';
      vsToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
      vsTokenSymbol: 'USDC';
      price: number;
    };
  };
}
export const useGetCurrentSolPrice = () => {
  return useQuery({
    queryKey: ['sol-price'],
    queryFn: async () => {
      const solPrice: PriceResponse = await (await fetch('https://price.jup.ag/v4/price?ids=SOL')).json();

      return new Decimal(solPrice.data.SOL.price).toDP(2).toNumber();
    },
  });
};
