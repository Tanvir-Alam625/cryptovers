import { Button } from '@/components/shared';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center" role="alert">
      <div className="mx-auto max-w-xl px-1 text-danger-500">
        <h2 className="text-lg font-semibold">{error.message} </h2>
        <p className="h-96 overflow-auto">{error.stack}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
