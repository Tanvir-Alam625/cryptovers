import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { useGetCryptoDetailsQuery } from '@/services/cryptoApi';
import millify from 'millify';
import { FiVolume2 } from 'react-icons/fi';
import { LiaHackerrank, LiaSellcast, LiaSellsy } from 'react-icons/lia';
import { MdOutlineCalculate, MdOutlinePriceChange } from 'react-icons/md';
import { SiCoinmarketcap, SiMarketo } from 'react-icons/si';
import { RiExchangeFundsFill } from 'react-icons/ri';
import { IoMdTimer } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { TbArrowsCross } from 'react-icons/tb';
import { Card } from '@/components/shared';
import HTMLReactParser from 'html-react-parser';

type LinksType = {
  name: string | undefined;
  url: string | undefined;
  type: string | undefined;
};

const CurrencyDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetCryptoDetailsQuery(id || '');
  if (isFetching) return <Spinner />;
  if (isError) throw new Error('Server error');
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price ? millify(cryptoDetails?.price) : 0}`,
      icon: <MdOutlinePriceChange size={18} />,
    },
    {
      title: 'Rank',
      value: cryptoDetails?.rank,
      icon: <LiaHackerrank size={18} />,
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.volume ? millify(cryptoDetails?.volume) : 0}`,
      icon: <FiVolume2 size={18} />,
    },
    {
      title: 'Market Cap',
      value: cryptoDetails?.marketCap ? `$ ${millify(cryptoDetails?.marketCap)}` : undefined,
      icon: <SiCoinmarketcap size={18} />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: cryptoDetails?.allTimeHigh?.price ? `$ ${millify(cryptoDetails?.allTimeHigh?.price)}` : undefined,
      icon: <IoMdTimer size={18} />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <SiMarketo size={18} />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <RiExchangeFundsFill size={18} />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? 'Yes' : 'No',
      icon: <LiaSellcast size={18} />,
    },
    {
      title: 'Total Supply',
      value: cryptoDetails?.supply?.total ? `$ ${millify(cryptoDetails?.supply?.total)}` : false,
      icon: <LiaSellsy size={18} />,
    },
    {
      title: 'Circulating Supply',
      value: cryptoDetails?.supply?.circulating ? `$ ${millify(cryptoDetails?.supply?.circulating)}` : false,
      icon: <MdOutlineCalculate size={18} />,
    },
  ];

  return (
    <PageWrapper title="Currency Details" className="space-y-6">
      <h2 className="text-sm font-semibold">
        {cryptoDetails?.name}-({cryptoDetails?.symbol})
      </h2>
      {/* chart Container  */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Body className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm font-medium">{cryptoDetails.name} Value Statistics</h2>
              <p className="text-xs font-normal">An Overview Showing the stats of {cryptoDetails.name}</p>
            </div>
            {stats.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between border-b px-1 py-2 last:border-none  dark:border-dark-700 "
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="text-sm font-normal">{item.title}</p>
                  </div>
                  <p className="font-medium">{item.value ? item.value : 'No Data Found'}</p>
                </div>
              );
            })}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-sm font-medium">Other Statistics</h2>
              <p className="text-xs font-normal">An Overview Showing the stats of all cryptocurrencies</p>
            </div>
            {genericStats.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between border-b px-1 py-2 last:border-none  dark:border-dark-700 "
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="text-sm font-normal">{item.title}</p>
                  </div>
                  <p className="font-medium">{item.value ? item.value : 'No Data Found'}</p>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Body className="space-y-2">
            <p className="text-sm font-medium">{cryptoDetails.name}</p>
            <div className="text-sm font-normal">{HTMLReactParser(cryptoDetails.description)}</div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body className="space-y-2">
            <p className="text-sm font-medium">{cryptoDetails.name} Links</p>
            <div>
              {cryptoDetails.links.length &&
                cryptoDetails.links.map((item: LinksType, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap items-center justify-between border-b px-1 py-2 last:border-none  dark:border-dark-700 "
                    >
                      <p className="text-sm font-normal">{item.type || ''}</p>
                      <Link
                        to={item.url || ''}
                        target="_blank"
                        className=" animate-fade-in-up text-sm font-normal text-primary-500 hover:underline"
                      >
                        {item.name ? item.name : 'No Data Found'}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </Card.Body>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default CurrencyDetailsPage;
