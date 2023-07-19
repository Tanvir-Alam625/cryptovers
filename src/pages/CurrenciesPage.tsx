import Currencies from '@/components/partials/Currencies/Currencies';
import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { CryptoDataType, useGetCryptosQuery } from '@/services/cryptoApi';
import { toast } from 'react-hot-toast';

const CurrenciesPage = () => {
  const { data: cryptoData, isLoading, error, isFetching } = useGetCryptosQuery();
  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (error) {
    toast.error("Couldn't Data fetch");
  }
  const { data } = cryptoData || ({} as CryptoDataType);
  return (
    <PageWrapper title="Currencies">
      <div className="flex flex-col gap-4">
        <Currencies coins={data.coins} sectionTitle="All Crypto Currencies" />
      </div>
    </PageWrapper>
  );
};

export default CurrenciesPage;
