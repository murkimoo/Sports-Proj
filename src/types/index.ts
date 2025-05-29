export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Competition {
  code: string;
  name: string;
}

export interface Match {
  id: string | number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  competition?: {
    name: string;
    logo?: string;
  };
  matchday?: number;
  homeTeam: {
    name: string;
    shortName?: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    shortName?: string;
    logo?: string;
  };
  venue?: {
    name: string;
    city?: string;
  };
}

export type MatchCardProps = {
  match: Match & {
    date: Date;
  };
}