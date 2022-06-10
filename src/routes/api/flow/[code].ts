import { getFlowByCode } from '$lib/modules/prisma';
import { isValidCode, isValidToken } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, params }) => {
  if (!isValidToken(request)) return { status: 401 };

  const { code } = params;
  if (!isValidCode(code)) return { status: 406 };

  const flow = await getFlowByCode(code);
  if (!flow) return { status: 410 };

  return {
    body: flow,
  };
};
