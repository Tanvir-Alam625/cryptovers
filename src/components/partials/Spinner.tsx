import React from 'react';
import { PuffLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed bottom-0 left-0 right-0 top-0 flex  w-full items-center justify-center"
    >
      <PuffLoader color="#8b5cf6" size={70} />
    </div>
  );
};

export default Spinner;
