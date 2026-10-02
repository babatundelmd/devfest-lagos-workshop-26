export type Track = 'Web' | 'Mobile' | 'Cloud' | 'AI';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export const TRACKS: readonly Track[] = ['Web', 'Mobile', 'Cloud', 'AI'];
export const LEVELS: readonly Level[] = ['Beginner', 'Intermediate', 'Advanced'];

export interface Talk {
  id: string;
  title: string;
  speaker: string;
  track: Track;
  level: Level;
  duration: number;
  abstract: string;
}

export type TalkDraft = Omit<Talk, 'id'>;

export const emptyDraft = (): TalkDraft => ({
  title: '',
  speaker: '',
  track: 'Web',
  level: 'Beginner',
  duration: 30,
  abstract: '',
});

export const toDraft = ({ id, ...draft }: Talk): TalkDraft => draft;
