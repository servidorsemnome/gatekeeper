import 'dotenv/config';

export const isValidToken = (request: Request) => {
  const { GK_TOKEN } = process.env;
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.split('Bearer ')?.[1];
  return token == GK_TOKEN;
};
