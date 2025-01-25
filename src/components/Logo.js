import React from 'react';
import { teluguTranslations } from '../translations/te';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
        {teluguTranslations.appName}
      </div>
    </div>
  );
};

export default Logo;