import { TokenInfo } from '@/lib/types';
import { LimitOrderProvider, inputMintFilter, outputMintFilter } from '@jup-ag/limit-order-sdk';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { Decimal } from 'decimal.js';

type Orders = Awaited<ReturnType<LimitOrderProvider['getOrders']>>;
type PriceToOrders = Record<number, Orders>;

export const useGetOrders = (
  limitOrder: LimitOrderProvider,
  inputTokenInfo: TokenInfo,
  outputTokenAddress: TokenInfo,
) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const orders = await limitOrder.getOrders([
        inputMintFilter(new PublicKey(inputTokenInfo.address)),
        outputMintFilter(new PublicKey(outputTokenAddress.address)),
      ]);
      console.log({ orders });

      const now = Date.now();
      const pricesHash = orders.reduce((acc, order) => {
        console.log(order.account.expiredAt);
        const isExpired = order.account.expiredAt
          ? new Decimal(order.account.expiredAt.toString()).mul(1000).lte(now)
          : false;
        if (isExpired) {
          console.warn(`order ${order.publicKey} expired`);
        } else {
          const outAmount = new Decimal(order.account.outAmount.toString()).div(
            new Decimal(10).pow(outputTokenAddress.decimals),
          );

          const inAmount = new Decimal(order.account.inAmount.toString()).div(
            new Decimal(10).pow(inputTokenInfo.decimals),
          );

          const price = inAmount.div(outAmount).toDP(2).toNumber();
          acc.set(price, (acc.get(price) || []).concat(order));
        }

        return acc;
      }, new Map<number, Orders>());

      // sorted hashMap hopefully
      return new Map<number, Orders>(Array.from(pricesHash.entries()).sort(([a], [b]) => Number(b) - Number(a)));
    },
  });
};
