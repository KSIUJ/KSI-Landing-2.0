import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = "" 
}) => (
  <header className={`text-center py-12 md:py-16 ${className}`}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative element */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-24"></div>
        <div className="mx-4 w-2 h-2 bg-slate-800 rounded-full"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-24"></div>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-(family-name:--font-inter) mb-4">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 font-(family-name:--font-ssp) max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </header>
);