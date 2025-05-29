import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Match } from '../types';
import { format } from 'date-fns';
import { handleNetworkError } from '../utils/networkUtils';

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;
const BASE_URL = 'http://localhost:5173/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useMatches = (date: string) => {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['matches', formattedDate],
    queryFn: async ({ signal }) => {
      if (!API_KEY) {
        throw new Error('API configuration is missing');
      }

      let retries = 0;
      while (retries < MAX_RETRIES) {
        try {
          const response = await axios.get(`${BASE_URL}/fixtures`, {
            params: { date: formattedDate },
            headers: { 'x-apisports-key': API_KEY },
            signal,
            timeout: 5000
          });

          if (!Array.isArray(response.data?.response)) {
            throw new Error('Invalid API response format');
          }

          return response.data.response.map((fixture: any) => ({
            id: fixture.fixture.id.toString(),
            utcDate: fixture.fixture.date,
            homeTeam: {
              name: fixture.teams.home.name,
              shortName: fixture.teams.home.name?.substring(0, 3).toUpperCase(),
              logo: fixture.teams.home.logo
            },
            awayTeam: {
              name: fixture.teams.away.name,
              shortName: fixture.teams.away.name?.substring(0, 3).toUpperCase(),
              logo: fixture.teams.away.logo
            },
            status: mapStatus(fixture.fixture.status.short),
            competition: {
              name: fixture.league.name,
              logo: fixture.league.logo
            },
            venue: fixture.fixture.venue ? {
              name: fixture.fixture.venue.name,
              city: fixture.fixture.venue.city
            } : undefined
          }));

        } catch (error) {
          if (axios.isAxiosError(error)) {
            retries++;
            if (retries === MAX_RETRIES) {
              throw new Error(`API Error: Failed after ${MAX_RETRIES} retries`);
            }
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            continue;
          }
          throw error;
        }
      }
      throw new Error('Failed to fetch matches');
    },
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

function mapStatus(apiStatus: string): Match['status'] {
  const statusMap: Record<string, Match['status']> = {
    'NS': 'SCHEDULED',
    'LIVE': 'LIVE',
    'FT': 'FINISHED',
    'PST': 'POSTPONED',
    'CANC': 'CANCELLED'
  };
  return statusMap[apiStatus] || 'SCHEDULED';
}