import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { useGetExchangesQuery } from '@/services/cryptoApi';
const ExchangesPage = () => {
  const { data, isFetching, isError } = useGetExchangesQuery();
  if (isFetching) return <Spinner />;
  // if (isError) throw new Error("Server Error Please Reload")
  console.log(data);

  return (
    <PageWrapper title="Exchanges">
      <h2 className="text-sm font-medium">All Exchnages</h2>
    </PageWrapper>
  );
};

export default ExchangesPage;
