import React from 'react';
import IndustryCard from '../components/IndustryCard';

const industries = [
  'Fintech', 'Insurance', 'IT Tech', 'Financial Services',
  'NDPMS', 'Airlines', 'Web 3 VR Game',
  'Infrastructure', 'Nauru Dollar', 'Air Lines', 'BankTech'
];

const Industries = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Industries</h2>
      <div className="flex flex-wrap gap-6">
        {industries.map((industry, idx) => (
          <IndustryCard key={idx} title={industry} />
        ))}
      </div>
    </div>
  );
};

export default Industries;
