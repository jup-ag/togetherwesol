import clsx from 'clsx';
import * as React from 'react';

interface IBrickProps {
  active?: boolean;
  price: number;
}

const Brick: React.FunctionComponent<IBrickProps> = ({ active, price }) => {
  return (
    <div className="w-auto h-14 flex-1">
      <div
        className={clsx('h-14 bg-amber-700 rounded-sm flex flex-col justify-center px-2', {
          'opacity-40 text-cyan-50 text-opacity-20': !active,
          'text-white': active,
        })}
      >
        <div className="text-right text-[14px] font-normal leading-tight tracking-wide">{price}</div>
      </div>
    </div>
  );
};

export default Brick;
