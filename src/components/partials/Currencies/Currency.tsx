import { Card } from '@/components/shared';
import { CoinType } from '@/pages/HomePage';
import millify from 'millify';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
type PropsType = {
  coin: CoinType;
  index: number;
};

const Currency = ({ coin, index }: PropsType) => {
  const navigate = useNavigate();
  console.log(coin);
  const handleNavigate = () => {
    navigate(`/currency/${coin.uuid}`);
  };

  return (
    <div className="w-full md:w-[320px]" onClick={handleNavigate}>
      <Card clickable>
        <Card.Body className="space-y-3">
          <div className="flex items-center justify-between">
            <Card.Title>
              {index}. {coin.name}
            </Card.Title>
            <img src={coin.iconUrl} alt="coin-img" className="h-12" />
          </div>
          <p>Price: ${millify(Number(coin.price))}</p>
          <p>Market Cap: {millify(Number(coin.marketCap))}</p>
          <p>
            Daily Change:{' '}
            <span
              className={twMerge(
                Number(coin.change) < 0
                  ? 'text-danger-500 dark:text-danger-500'
                  : 'dark:tex-success-500 text-success-500'
              )}
            >
              {millify(Number(coin.change))}%
            </span>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Currency;
