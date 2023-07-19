import { CoinType } from '@/pages/HomePage';
import React from 'react';
import Currency from './Currency';

type PropsType = {
  coins: CoinType[];
};

const Currencies = ({ coins }: PropsType) => {
  return (
    <>
      <h2 className="mt-2">Top 10 Crypto Currencies</h2>
      <div className="flex flex-wrap items-center gap-6">
        {coins?.map((coin, index) => (
          <Currency key={index} index={index + 1} coin={coin} />
        ))}
      </div>
    </>
  );
};

export default Currencies;
