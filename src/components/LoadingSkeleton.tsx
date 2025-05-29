import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LoadingSkeletonProps {
  count: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  const { theme } = useTheme();
  
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className={`rounded-lg overflow-hidden shadow-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } animate-pulse`}
        >
          <div className={`p-4 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`w-24 h-6 rounded-full ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
              }`}></div>
              <div className={`w-16 h-4 rounded ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col items-center w-5/12">
                <div className={`w-16 h-16 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } mb-2`}></div>
                <div className={`w-20 h-5 rounded ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              </div>
              
              <div className="w-2/12 flex justify-center">
                <div className={`w-8 h-8 rounded ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              </div>
              
              <div className="flex flex-col items-center w-5/12">
                <div className={`w-16 h-16 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } mb-2`}></div>
                <div className={`w-20 h-5 rounded ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              </div>
            </div>
            
            <div className={`rounded-lg p-3 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-4 h-4 rounded ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                } mr-2`}></div>
                <div className={`w-32 h-4 rounded ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
              </div>
              
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                } mr-2`}></div>
                <div className={`w-40 h-4 rounded ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;