import { CoinType } from '@/pages/HomePage';
import Currency from './Currency';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

type PropsType = {
  coins: CoinType[];
  sectionTitle: string;
};

const Currencies = ({ coins, sectionTitle }: PropsType) => {
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const [coinsData, setCoinsData] = useState<CoinType[]>([]);
  useEffect(() => {
    if (!searchValue) {
      setCoinsData(coins);
      return;
    }
    const debounceTimer = setTimeout(() => {
      const filteredData = coins.filter((coin: CoinType) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCoinsData(filteredData);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [coins, searchValue]);
  return (
    <>
      <h2 className="mt-2">{sectionTitle}</h2>
      <div className="flex flex-wrap items-center gap-6">
        {coinsData.length
          ? coinsData.map((coin: CoinType, index: number) => <Currency key={index} index={index + 1} coin={coin} />)
          : null}
      </div>
      {!coinsData.length ? (
        <div className="my-12 flex items-center justify-center">
          <p className=" text-center text-sm">Not Currency Found</p>
        </div>
      ) : null}
    </>
  );
};

export default Currencies;
