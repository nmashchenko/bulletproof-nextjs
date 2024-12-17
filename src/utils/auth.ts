import { cookies } from 'next/headers';

export const AUTH_TOKEN_COOKIE_NAME = 'react_app_token';

export const getAuthTokenCookie = () => {
  if (typeof window !== 'undefined') return '';
  const cookieStore = cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;
};

export const checkLoggedIn = () => {
  const cookieStore = cookies();
  return !!cookieStore.get(AUTH_TOKEN_COOKIE_NAME);
};
