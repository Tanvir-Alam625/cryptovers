import Currencies from '@/components/partials/Currencies/Currencies';
import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { CryptoDataType, useGetCryptosQuery } from '@/services/cryptoApi';
import { toast } from 'react-hot-toast';

const CurrenciesPage = () => {
  const { data: cryptoData, isLoading, error, isFetching, isError } = useGetCryptosQuery();
  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (isError || error) throw new Error('Server Error Please Reload');
  const { data } = cryptoData || ({} as CryptoDataType);
  return (
    <PageWrapper title="Currencies" className="space-y-4">
      <h2 className="text-sm font-semibold">All Crypto Currencies</h2>
      <div className="flex flex-col gap-4">
        <Currencies coins={data.coins} />
      </div>
    </PageWrapper>
  );
};

export default CurrenciesPage;
