import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { Card } from '@/components/shared';
import { useGetExchangesQuery } from '@/services/cryptoApi';
import millify from 'millify';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const ExchangesPage = () => {
  const { data, isLoading, isFetching, isError, error } = useGetExchangesQuery({});
  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (error || isError) {
    toast.error("Couldn't Data fetch");
  }
  const exchangesData = data?.data?.exchanges;
  type DataType = (typeof exchangesData)[0];
  return (
    <PageWrapper title="Exchanges" className="space-y-4">
      <h2 className="text-sm font-medium">All Exchanges</h2>
      <div className="flex flex-wrap items-center gap-6">
        {exchangesData.length
          ? exchangesData.map((exchange: DataType, index: number) => (
              <Link key={index} to={exchange.coinrankingUrl} target="_blank">
                <Card clickable className="md:w-[320px]">
                  <Card.Body>
                    <div className="flex items-center justify-between ">
                      <h2 className="text-sm font-medium">{exchange.name}</h2>
                      <img src={exchange.iconUrl} alt="exchange-icon" className="h-[50px] w-[50px]" />
                    </div>
                    <div className="space-y-3 pt-3">
                      <p className="text-xs">Price: {millify(Number(exchange.price))}</p>
                      <p className="text-xs">24h Volume: {millify(Number(exchange['24hVolume']))}</p>
                      <p className="text-xs">Rank: {exchange.rank}</p>
                      <p className="text-xs">Verified: {exchange.verified ? 'Yes' : 'No'}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))
          : null}
      </div>
      {!exchangesData.length ? (
        <div className="my-12 flex items-center justify-center">
          <p className=" text-center text-sm">Not Currency Found</p>
        </div>
      ) : null}
    </PageWrapper>
  );
};

export default ExchangesPage;
