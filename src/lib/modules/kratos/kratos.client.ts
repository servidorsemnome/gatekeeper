import { KRATOS_URL } from '$lib/env';

export const getIdentity = async (cookies?: string) => {
  const headers = cookies ? { Cookie: cookies } : undefined;
  try {
    const resp = await fetch(`${KRATOS_URL}/sessions/whoami`, {
      headers,
      credentials: 'include',
    });
    const data = await resp.json();
    if (resp.status != 200) return null;
    return data.identity;
  } catch (error) {
    return null;
  }
};
