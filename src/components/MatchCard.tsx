import React from 'react';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import type { MatchCardProps } from '../types';

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { theme } = useTheme();
  const matchTime = new Date(match.utcDate);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`rounded-lg overflow-hidden shadow-lg ${
        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'
      } transition-all duration-300`}
    >
      {/* Competition Header */}
      <div className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">
            {match.competition?.name || 'Unknown Competition'}
          </span>
          <span className="text-xs opacity-75">
            Matchday {match.matchday || 'N/A'}
          </span>
        </div>
      </div>

      {/* Teams Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className="flex flex-col items-center space-y-2 w-1/3">
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name}
              className="w-12 h-12 object-contain"
            />
            <span className="text-sm font-medium text-center">
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
          </div>

          {/* Match Info */}
          <div className="flex flex-col items-center w-1/3">
            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              VS
            </span>
            <span className="text-xs mt-2 opacity-75">
              {format(matchTime, 'HH:mm')}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center space-y-2 w-1/3">
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name}
              className="w-12 h-12 object-contain"
            />
            <span className="text-sm font-medium text-center">
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Match Details */}
        <div className={`mt-4 pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between text-xs opacity-75">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{format(matchTime, 'dd MMM yyyy')}</span>
            </div>
            {match.venue && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{match.venue.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;