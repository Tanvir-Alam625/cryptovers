/* eslint-disable @typescript-eslint/no-explicit-any */
import PageWrapper from '@/components/partials/PageWrapper';
import { useGetCryptosQuery, CryptoDataType } from '@/services/cryptoApi';
import toast from 'react-hot-toast';
import Spinner from '@/components/partials/Spinner';
import { Card } from '@/components/shared';
import { PiCurrencyCircleDollarBold } from 'react-icons/pi';
import { LuFileVolume2 } from 'react-icons/lu';
import { BiCoinStack } from 'react-icons/bi';
import { MdCurrencyExchange } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { LiaSalesforce } from 'react-icons/lia';
import CountUp from 'react-countup';
import millify from 'millify';
import Currencies from '@/components/partials/Currencies/Currencies';

export type CoinType = {
  '24hVolume': string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number | string;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: number | string;
  rank: string | number;
  sparkline: string[] | number[];
  symbol: string;
  tier: string | number;
  uuid: string;
};

const HomePage = () => {
  const { data: cryptoData, isLoading, error, isFetching } = useGetCryptosQuery();
  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (error) {
    toast.error("Couldn't Data fetch");
  }
  const { data } = cryptoData || ({} as CryptoDataType);
  console.log(data.coins);

  return (
    <PageWrapper title="Home" className="space-y-4">
      <h2 className="mt-2">Global Crypto Stats</h2>
      {/* Stats  */}
      <div className="flex flex-wrap items-center gap-6">
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-primary-500 bg-opacity-20 p-3">
              <PiCurrencyCircleDollarBold size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="whitespace-nowrap text-sm font-medium text-dark-500 dark:text-dark-300">
                Crypto Currencies
              </h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={data.stats.total}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-danger-500 bg-opacity-20 p-3">
              <LuFileVolume2 size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-dark-500 dark:text-dark-300">24h Volume</h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={Number(data.stats.total24hVolume)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-info-500 bg-opacity-20 p-3">
              <BiCoinStack size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-dark-500 dark:text-dark-300">Coins</h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={Number(data.stats.totalCoins)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-warning-500 bg-opacity-20 p-3">
              <MdCurrencyExchange size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-dark-500 dark:text-dark-300">Exchanges</h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={Number(data.stats.totalExchanges)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-success-500 bg-opacity-20 p-3">
              <HiOutlineAcademicCap size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-dark-500 dark:text-dark-300">MarketCap</h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={Number(data.stats.totalMarketCap)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card className="max-w-[300px]">
          <Card.Body className="flex items-center gap-2">
            <div className="rounded-full bg-secondary-500 bg-opacity-20 p-3">
              <LiaSalesforce size={24} className="text-dark-500 dark:text-dark-200" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-dark-500 dark:text-dark-300">Markets</h6>
              <h1>
                <CountUp
                  className="font-medium text-dark-500 dark:text-dark-300"
                  style={{ fontSize: '24px' }}
                  start={0}
                  end={Number(data.stats.totalMarkets)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Currencies coins={data.coins.slice(0, 10)} />
    </PageWrapper>
  );
};

export default HomePage;
