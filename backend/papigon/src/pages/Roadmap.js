import React from 'react';

const milestones = [
  { 
    title: 'Website Launch', 
  },
  { 
    title: 'Crypto pre-booking starts', 
  },
  { 
    title: 'Token launch', 
  },
  { 
    title: 'Raising the funds', 
  },
  { 
    title: 'Nauru and Guyana collaboration', 
    subText: '$18 billion dollars currency swap',
  },
  { 
    title: 'Claim in the token + B2B start', 
  },
];

const Roadmap = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white p-10">
      <h1 className="text-4xl font-extrabold mb-12 text-left w-full max-w-3xl
                     bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-600
                     bg-clip-text text-transparent select-none font-sans"
      >
        Roadmap
      </h1>

      <div className="w-full max-w-xl mx-0">
        {milestones.map((milestone, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`mb-6 p-4 rounded-lg shadow-md cursor-pointer transition-transform duration-300
                          hover:-translate-x-4 hover:shadow-2xl
                          border-2 border-pink-700
                          max-w-sm
                          ${isLeft ? 'ml-0 self-start' : 'ml-auto self-end'}
                          `}
              style={{
                boxShadow: '0 3px 10px rgba(56, 182, 255, 0.6)',
              }}
            >
              <h3
                className="text-xl font-semibold
                           bg-gradient-to-r from-pink-400 via-red-400 to-pink-600
                           bg-clip-text text-transparent font-mono"
              >
                {milestone.title}
              </h3>
              {milestone.subText && (
                <p className="mt-1 text-xs italic text-gray-400 tracking-widest font-mono">
                  {milestone.subText}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
