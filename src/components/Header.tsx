import { useIsBrowser } from '@/hooks/useIsBrowser';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import * as React from 'react';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const isBrowser = useIsBrowser();
  return (
    <header className="w-full h-[60px] px-5 bg-gray-800 border border-white border-opacity-5 justify-start items-center gap-12 inline-flex">
      <div className="grow shrink basis-0 h-5 justify-start items-center gap-3 flex">
        <div className="text-right text-white text-[20px] font-normal leading-tight tracking-wide">#TogetherWeSOL</div>
      </div>
      <div className="grow shrink basis-0 h-10 justify-end items-center gap-2 flex">
        {isBrowser && <WalletMultiButton />}
      </div>
    </header>
  );
};

export default Header;
