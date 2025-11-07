import React from 'react';

interface StatusIndicatorProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ title, message, children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      
      {children && (
        <div className="text-gray-400 mb-4">
          {children}
        </div>
      )}

      <h3 className="text-xl font-semibold text-slate-900 font-inter">{title}</h3>

      <p className="mt-2 text-gray-600 font-ssp">{message}</p>
    </div>
  );
};