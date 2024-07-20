export const authenticatedUrl: string = '/';
export const unauthenticatedUrl: string = '/login';

export const enableSignUp: boolean = true;

export const unprotectedRoutes: Set<string> = new Set([
  '/auth-confirm',
  '/forgot-password',
  '/login',
  '/privacy',
  '/sign-up',
  '/terms',
]);
