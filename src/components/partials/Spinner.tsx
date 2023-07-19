import React from 'react';
import { PuffLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex h-screen   w-full items-center justify-center">
      <PuffLoader color="#8b5cf6" size={70} />
    </div>
  );
};

export default Spinner;
