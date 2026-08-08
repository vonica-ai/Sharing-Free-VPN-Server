export type Language = 'my' | 'en';
export type Theme = 'light' | 'dark';
export type TextSize = 'small' | 'medium' | 'large';
export type IconSize = 'small' | 'medium' | 'large';
export type Page = 'servers' | 'sublink' | 'apps' | 'settings' | 'contact';

export interface Server {
  id: number;
  name: string;
  description: string;
  location: string;
  config: string;
  pingUrl: string;
}
