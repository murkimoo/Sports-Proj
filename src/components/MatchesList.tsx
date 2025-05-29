import React from 'react';
import { format } from 'date-fns';
import { useMatches } from '../hooks/useMatches';
import MatchCard from './MatchCard';
import LoadingSkeleton from './LoadingSkeleton';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { AlertCircle, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Match } from '../types';

interface MatchesListProps {
  selectedDate: Date;
}

const MatchesList: React.FC<MatchesListProps> = ({ selectedDate }) => {
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const { data: matches, isLoading, error } = useMatches(formattedDate);
  const { theme } = useTheme();
  
  if (isLoading) {
    return <LoadingSkeleton count={5} />;
  }
  
  if (error) {
    return (
      <div className={`rounded-lg ${
        theme === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
      } p-6 text-center`}>
        <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        <h3 className="text-xl font-bold mb-2">Unable to load matches</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <p className="mt-4 text-sm">
          Please try again later or check your connection
        </p>
      </div>
    );
  }
  
  if (!matches?.length) {
    return (
      <div className={`rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      } p-8 text-center`}>
        <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="text-xl font-bold mb-2">No matches scheduled</h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          There are no matches scheduled for {format(selectedDate, 'MMMM d, yyyy')}
        </p>
      </div>
    );
  }
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4"
    >
      {matches.map((match: Match) => (
        <MatchCard 
          key={match.id} 
          match={{
            ...match,
            id: String(match.id),
            date: new Date(match.utcDate)
          }} 
        />
      ))}
    </motion.div>
  );
};

export default MatchesList;