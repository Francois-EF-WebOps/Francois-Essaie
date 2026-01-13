
export type Section = 
  | 'MANIFESTO' 
  | 'PLAYBOOK' 
  | 'AGENTS' 
  | 'XP_MATH' 
  | 'PERFECT_DAY' 
  | 'QUESTS' 
  | 'TRACKER';

export interface AgentSchema {
  name: string;
  role: string;
  primaryDirective: string;
  notionProperties: string[];
  failureHandling: string;
}

export interface Quest {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  xp: number;
  completed: boolean;
}

export interface DayActivity {
  time: string;
  activity: string;
  category: 'Body' | 'Mind' | 'Family' | 'Empire';
}
