import Currencies from '@/components/partials/Currencies/Currencies';
import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { useGetCryptosQuery } from '@/services/cryptoApi';

const CurrenciesPage = () => {
  const { data: cryptoData, isLoading, error, isFetching, isError } = useGetCryptosQuery({});
  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (isError || error) throw new Error('Server Error Please Reload');
  return (
    <PageWrapper title="Currencies" className="space-y-4">
      <h2 className="text-sm font-semibold">All Crypto Currencies</h2>
      <div className="flex flex-col gap-4">
        <Currencies coins={cryptoData.data.coins} />
      </div>
    </PageWrapper>
  );
};

export default CurrenciesPage;
