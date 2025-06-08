import { auth } from 'express-oauth2-jwt-bearer';

console.log('AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
console.log('Constructed issuerBaseURL:', `https://${process.env.AUTH0_DOMAIN}`);

// Create the JWT validation middleware - that's it!
export const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256'
});
