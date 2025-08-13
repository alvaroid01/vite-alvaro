export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

export interface GoogleProfile {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name?: string;
  given_name?: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}
