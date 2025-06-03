import { auth } from 'express-oauth2-jwt-bearer';

// Create the JWT validation middleware - that's it!
export const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256'
});
