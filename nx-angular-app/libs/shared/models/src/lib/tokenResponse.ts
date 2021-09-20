export interface TokenResponse {
  token: string;
  expiration: number;
}

export interface TokenRequest {
  email: string;
  password: string;
}

export interface JWTDecoded {
  aud: string;
  exp: string;
  iat: string;
  jti: string;
  nbf: string;
  permissions: any;
  roles: string[];
  sub: string;
}
