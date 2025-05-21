import React from 'react';

const IndustryCard = ({ title }) => {
  return (
    <div className="bg-teal-700 text-white rounded-md p-6 text-center shadow-md hover:scale-105 transition h-30 w-40 flex flex-col justify-center items-center cursor-pointer border-1 border-white-900">
      
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-yellow-400 font-semibold">COMING SOON</p>
    </div>
  );
};

export default IndustryCard;
