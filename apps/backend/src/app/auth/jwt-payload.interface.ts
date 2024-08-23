export interface JwtPayload {
    username: string;
    sub: string; // Usually the user's ID
    email?: string; // Optional: Add other relevant fields if needed
    iat?: number; // Issued at (optional, usually handled by JWT library)
    exp?: number; // Expiration time (optional, usually handled by JWT library)
    roles: string[];
  }
  