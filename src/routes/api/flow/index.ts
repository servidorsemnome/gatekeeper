import { getOrCreateUserFlow, getUserGrant } from '$lib/modules/prisma';
import { isDateExpired, isValidNickname, isValidToken } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
  if (!isValidToken(request)) return { status: 401 };

  const { nickname, ip } = await request.json();
  if (!nickname || !ip) return { status: 400 };
  if (!isValidNickname(nickname)) return { status: 406 };

  const latestUserGrant = await getUserGrant(nickname, ip);
  if (!!latestUserGrant && !isDateExpired(latestUserGrant.expirationDate))
    return { status: 409 };

  const flow = await getOrCreateUserFlow(nickname, ip);
  if (!flow) return { status: 500 };

  return {
    body: flow,
  };
};
