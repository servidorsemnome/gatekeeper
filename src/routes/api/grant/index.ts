import {
  createGrant,
  getFlowByCode,
  getUserGrant,
  updateFlow,
} from '$lib/modules/prisma';
import {
  isNicknameOwner,
  isValidToken,
  generateExpirationDate,
  getExpirationTime,
  isValidNickname,
} from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, url }) => {
  if (!isValidToken(request)) return { status: 401 };

  const nickname = url.searchParams.get('nickname') || '';
  const ip = url.searchParams.get('ip') || '';
  if (!nickname || !ip) return { status: 400 };
  if (!isValidNickname(nickname)) return { status: 406 };

  const grant = await getUserGrant(nickname, ip);
  // if (!grant) create flow here?

  return {
    body: grant,
  };
};

export const post: RequestHandler = async ({ request, locals }) => {
  if (!locals?.identity) return { status: 401 };

  const { code, expiration } = await request.json();
  if (!code || !expiration) return { status: 400 };

  const flow = await getFlowByCode(code);
  if (!flow) return { status: 404 };
  if (flow.grantId != null) return { status: 409 };

  if (!isNicknameOwner(locals?.identity, flow.nickname)) return { status: 403 };

  const [value, unit] = getExpirationTime(expiration);
  const expirationDate = generateExpirationDate(value, unit);
  const grant = await createGrant(flow.nickname, flow.ip, true, expirationDate);

  await updateFlow(code, { grantId: grant.id });

  return {
    body: grant,
  };
};
