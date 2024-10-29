import React from 'react';

interface FastestWinProps {
    fastestWin: number;
  }

const FastestWin: React.FC<FastestWinProps> = ({ fastestWin }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-2xl font-semibold">Fastest Win</h2>
      <span className="text-3xl font-bold text-orange-300">In {fastestWin} tries!</span>
    </div>
  );
};

export default FastestWin;