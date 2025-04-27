export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  expires_at: string
  name: string
  email: string
  role: string
}

export interface CreateUserRequest {
  email: string
  password: string
  name: string
}

export interface CreateUserResponse {
  email: string
  name: string
}

export interface ShortUrl {
  id: number
  shortKey: string
  originalUrl: string
  isPrivate: boolean
  clickCount: number
  expiresAt: string
  createdBy?: ShortUrlCreatedBy
  createdAt: string
}

export interface ShortUrlCreatedBy {
  id: number
  name: string
}

export interface PagedResult<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CreateShortUrlRequest {
  originalUrl: string;
  isPrivate?: boolean;
  expirationInDays?: number;
}
