export interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOTP {
  _id: string;
  email: string;
  code: string;
  expiresAt: Date;
  verified: boolean;
  createdAt: Date;
}

export interface JWTPayload {
  email: string;
  iat?: number;
  exp?: number;
}
