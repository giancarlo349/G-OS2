
export interface Note {
  id: string;
  title: string;
  content: string;
  author: string;
  updatedAt: number;
}

export enum AppState {
  LOADING = 'LOADING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}
