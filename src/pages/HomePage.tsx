import PageWrapper from '@/components/partials/PageWrapper';
import { useGetCryptosQuery } from '@/services/cryptoApi';
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
import { useDispatch } from 'react-redux';
import { clearSearchValue } from '@/app/slices/searchSlice';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetTopNewsQuery } from '@/services/newsApi';
import HTMLReactParser from 'html-react-parser';
import moment from 'moment';

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
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: cryptoData, isLoading, error, isFetching } = useGetCryptosQuery({});
  const {
    data: cryptoNews,
    isFetching: newsFetching,
    isError: newsErrors,
  } = useGetTopNewsQuery({ category: 'coincu' });

  useEffect(() => {
    dispatch(clearSearchValue());
  }, [dispatch, location]);

  if (isLoading || isFetching || newsFetching) {
    return <Spinner />;
  }

  if (error || newsErrors) {
    toast.error("Couldn't Data fetch");
  }
  const handleNewsClick = (url: string) => {
    window.open(url, '_blank');
  };
  type NewsDataType = (typeof cryptoNews)[0];

  return (
    <PageWrapper title="Home" className="space-y-4">
      <h2 className="text-sm font-semibold">Global Crypto Stats</h2>
      {/* Stats  */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
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
                  end={cryptoData.data.stats.total}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card>
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
                  end={Number(cryptoData.data.stats.total24hVolume)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card>
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
                  end={Number(cryptoData.data.stats.totalCoins)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card>
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
                  end={Number(cryptoData.data.stats.totalExchanges)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card>
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
                  end={Number(cryptoData.data.stats.totalMarketCap)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
        <Card>
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
                  end={Number(cryptoData.data.stats.totalMarkets)}
                  formattingFn={(value: number): string => millify(value)}
                />
              </h1>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-start gap-4 md:items-center md:justify-between">
          <h2 className="text-sm font-semibold">Top 10 Crypto Currencies</h2>
          <Link to="currencies" className="tex-sm  text-primary-500">
            Show More
          </Link>
        </div>
        <Currencies coins={cryptoData.data.coins.slice(0, 10)} />
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-start gap-4 md:items-center md:justify-between">
          <h2 className="text-sm font-semibold">Top 10 Crypto News</h2>
          <Link to="news" className="tex-sm   text-primary-500">
            Show More
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cryptoNews?.map((news: NewsDataType, index: number) => {
            return (
              <Card clickable key={index} onClick={() => handleNewsClick(news.url)}>
                <Card.Body className="space-y-4">
                  <h2 className="text-sm font-medium">{news.title}</h2>
                  <img src="images/thum.jpg" className="h-[200px] w-full rounded-primary" alt="news-img" />

                  <span className="text-xs font-normal"> {HTMLReactParser(news.description)}</span>
                  <div className="flex items-center justify-between gap-2">
                    <img
                      src="images/user-thum.png"
                      alt="user-img"
                      className="border-3 h-[40px] w-[40px] rounded-full border-primary-500"
                    />
                    <p className="text-xs font-normal">{moment(news.date).startOf('hour').fromNow()}</p>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
