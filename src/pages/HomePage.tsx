import PageWrapper from '@/components/partials/PageWrapper';
import { useGetCryptosQuery } from '@/services/cryptoApi';
import { PuffLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
const HomePage = () => {
  const { data, isError, isLoading } = useGetCryptosQuery();
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <PuffLoader color="#8b5cf6" size={70} />
      </div>
    );
  }
  if (isError) {
    toast.error("Couldn't Data fetch");
  }
  console.log(data);

  return (
    <PageWrapper title="Home">
      <h2 className="text-white">This is home Page</h2>
      <Toaster position="top-center" reverseOrder={false} />
    </PageWrapper>
  );
};

export default HomePage;
