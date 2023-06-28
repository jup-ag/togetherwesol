import Image from 'next/image';
import Header from '@/components/Header';
import { useJupiterLimitOrder } from '@/hooks/useJupiterLimitOrder';
import { SOL_TOKEN_INFO, USDC_TOKEN_INFO, connection } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { inputMintFilter, outputMintFilter } from '@jup-ag/limit-order-sdk';
import { PublicKey } from '@solana/web3.js';
import { useGetOrders } from '@/hooks/useGetOrders';
import { useGetCurrentSolPrice } from '@/hooks/useGetCurrentSolPrice';
import { Skeleton } from '@/components/ui/skeleton';
import WallSvg from '@/svgs/wall.svg';
import Mob1Svg from '@/svgs/mob_1.svg';
import Mob2Svg from '@/svgs/mob_2.svg';
import Mob3Svg from '@/svgs/mob_3.svg';
import Brick from '@/components/Brick';
import { useMemo } from 'react';
import { chunkBySize } from '@/lib/utils';

export default function Home() {
  const limitOrder = useJupiterLimitOrder(connection);

  const { data } = useGetOrders(limitOrder, USDC_TOKEN_INFO, SOL_TOKEN_INFO);
  const { data: solPrice, isLoading: isLoadingSolPrice } = useGetCurrentSolPrice();

  const chunksData = useMemo(() => {
    if (data) {
      return chunkBySize(Array.from(data), 4, 3);
    }
    return [];
  }, [data]);

  return (
    <>
      <Header />
      <main className={`flex min-h-screen flex-col items-center justify-center px-8`}>
        <div className="justify-center items-start gap-3 inline-flex">
          <div className="p-6 border-l-4 border-r-4 border-b-4 border-amber-800 flex-col justify-end items-center gap-1 inline-flex">
            <div className="self-stretch h-[56px] pb-1 flex-col justify-center items-center gap-1 flex">
              <div className="flex mb-2">
                <Mob1Svg />
                <Mob2Svg />
                <Mob3Svg />
              </div>
              <div className="text-center text-white text-[14px] font-normal leading-tight tracking-wide mb-6">
                Current {isLoadingSolPrice ? <Skeleton className="w-20 h-5" /> : solPrice}
              </div>
            </div>
            <WallSvg className="w-full mb-1" />
            <div className="self-stretch h-[440px] flex-col justify-start items-start gap-2 flex overflow-y-auto">
              {chunksData.map((chunk, index) => {
                return (
                  <div key={index} className="w-full flex space-x-2">
                    {chunk.map((item, index) => {
                      return <Brick active key={index} price={item[0]} />;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-2 bg-amber-700 justify-start items-start gap-5 flex">
            <div className="text-right text-white text-[16px] font-normal leading-tight tracking-wide">{'>'}</div>
          </div>
        </div>
      </main>
    </>
  );
}
