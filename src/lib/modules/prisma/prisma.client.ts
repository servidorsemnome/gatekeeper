import { PrismaClient } from '@prisma/client';
import {
  isDateExpired,
  generateCode,
  generateExpirationDate,
} from '$lib/utils';
import type { Flow } from '@prisma/client';

const prisma = new PrismaClient();

export const getFlowByCode = async (code: string) => {
  const flow = await prisma.flow.findUnique({
    where: { code },
  });
  return flow;
};

export const createUserFlow = async (nickname: string, ip: string) => {
  const code = generateCode();
  const expirationDate = generateExpirationDate(1, 'minute');
  const flow = await prisma.flow.create({
    data: {
      code,
      nickname,
      ip,
      expirationDate,
    },
  });
  return flow;
};

export const getOrCreateUserFlow = async (nickname: string, ip: string) => {
  const flows = await prisma.flow.findMany({
    where: { nickname, ip },
  });
  const activeFlows = flows
    .map(
      (flow) =>
        !isDateExpired(flow.expirationDate) && flow.grantId == null && flow,
    )
    .filter((flow) => !!flow);
  if (activeFlows.length) return activeFlows[activeFlows.length - 1];
  return createUserFlow(nickname, ip);
};

export const updateFlow = async (code: string, data: Partial<Flow>) => {
  return prisma.flow.update({
    where: { code },
    data,
  });
};

export const getUserGrant = async (nickname: string, ip: string) => {
  const grants = await prisma.grant.findMany({
    where: { nickname, ip },
  });
  return grants.length ? grants[grants.length - 1] : null;
};

export const createGrant = async (
  nickname: string,
  ip: string,
  authorized: boolean,
  expirationDate: string,
) => {
  const grant = await prisma.grant.create({
    data: {
      nickname,
      ip,
      authorized,
      expirationDate,
    },
  });
  return grant;
};
