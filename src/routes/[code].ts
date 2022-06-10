import geoip from 'geoip-lite';
import { GATEKEEPER_URL, WEBSITE_URL } from '$lib/env';
import { getFlowByCode } from '$lib/modules/prisma';
import { isDateExpired, isNicknameOwner, isValidCode } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals, params, url }) => {
  const returnTo = GATEKEEPER_URL
    ? `${GATEKEEPER_URL}${url.pathname}`
    : url.href;

  if (!isValidCode(params.code))
    return {
      status: 406,
    };

  if (!locals?.identity)
    return {
      status: 302,
      headers: {
        location: `${WEBSITE_URL}/auth/login?return_to=${returnTo}`,
      },
    };

  const flow = await getFlowByCode(params.code);
  if (!flow || !!flow?.grantId || isDateExpired(flow?.expirationDate))
    return { status: 410 };

  if (!isNicknameOwner(locals?.identity, flow.nickname)) return { status: 403 };

  const loc = geoip.lookup(flow.ip);

  return {
    body: {
      ...params,
      identity: locals.identity,
      nickname: flow.nickname,
      location: {
        city: loc?.city,
        region: loc?.region,
        country: loc?.country,
      },
    },
  };
};
