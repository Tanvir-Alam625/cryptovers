import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="my-8 mt-auto flex flex-wrap items-center justify-center px-6 text-slate-500">
      <p className="text-sm">
        Copyright © {new Date().getFullYear()}
        <Link className="text-primary-500 hover:underline" to="/">
          Cryptovers
        </Link>
        , All right Reserved
      </p>
    </footer>
  );
};

export default Footer;
