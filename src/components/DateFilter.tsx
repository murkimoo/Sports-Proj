import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface DateFilterProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
  const { theme } = useTheme();
  const today = new Date();
  
  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  
  return (
    <div className={`mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDateChange(subDays(selectedDate, 1))}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } transition-colors`}
            aria-label="Previous day"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium">
            {format(selectedDate, 'MMMM d, yyyy')}
          </span>
          <button
            onClick={() => onDateChange(addDays(selectedDate, 1))}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } transition-colors`}
            aria-label="Next day"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <motion.button
            key={date.toISOString()}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateChange(date)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
              isSameDay(date, selectedDate)
                ? 'bg-green-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className="text-xs uppercase font-medium">
              {format(date, 'EEE')}
            </span>
            <span className="text-lg font-bold">{format(date, 'd')}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;