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
      className={`rounded-lg overflow-hidden shadow-md ${
        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
      } transition-all duration-300`}
    >
      <div className={`p-4 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            match.competition?.name === 'Premier League' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
              : match.competition?.name === 'UEFA Champions League'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              : match.competition?.name === 'Ligue 1'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            }`}>
            {match.competition?.name}
            </span>
          <span className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Matchday {match.matchday || 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center text-center w-5/12">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-2 flex items-center justify-center">
              {match.homeTeam.logo ? (
                <img 
                  src={match.homeTeam.logo} 
                  alt={`${match.homeTeam.shortName} logo`}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {match.homeTeam.shortName?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <h3 className="font-bold text-base">{match.homeTeam.shortName}</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center w-2/12">
            <span className="text-lg font-bold">vs</span>
          </div>
          
          <div className="flex flex-col items-center text-center w-5/12">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-2 flex items-center justify-center">
              {match.awayTeam.logo ? (
                <img 
                  src={match.awayTeam.logo} 
                  alt={`${match.awayTeam.shortName} logo`}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {match.awayTeam.shortName?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <h3 className="font-bold text-base">{match.awayTeam.shortName}</h3>
          </div>
        </div>
        
        <div className={`rounded-lg p-3 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center mb-2">
            <Clock size={16} className="mr-2 text-green-500" />
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {format(matchTime, 'E, MMM d · h:mm a')}
            </span>
          </div>
          
          {match.venue && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-green-500" />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {match.venue.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;