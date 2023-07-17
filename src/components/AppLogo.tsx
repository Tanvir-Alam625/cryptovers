import { twMerge } from 'tailwind-merge';

type Props = {
  size?: number;
  className?: string;
};

const AppLogo = ({ size = 40, className }: Props) => {
  return (
    <img
      src="https://i.ibb.co/Z11pcGG/cryptocurrency.png"
      alt="app-img"
      width={size}
      height={size}
      className={twMerge(className)}
    />
  );
};

export default AppLogo;
