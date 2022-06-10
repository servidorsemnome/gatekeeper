export const grantAccess = async (code: string, expiration: string) => {
  try {
    const resp = await fetch('/api/grant', {
      method: 'POST',
      body: JSON.stringify({
        code,
        expiration,
      }),
    });
    return resp.ok;
  } catch (error) {
    return false;
  }
};
