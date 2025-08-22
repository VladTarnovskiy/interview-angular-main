export interface Movie {
  id: number;
  name: string;
  description?: string | null;
  isOnline: boolean;
}

export interface CreateMovieRequest {
  name: string;
  description?: string | null;
}

export interface UpdateMovieRequest {
  name?: string;
  description?: string | null;
  isOnline?: boolean;
}
