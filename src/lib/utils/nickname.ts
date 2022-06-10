export const isNicknameOwner = (identity: any, nickname: string) =>
  identity?.traits?.nicknames.find((nick: string) => nick == nickname);

export const isValidNickname = (nick: string) =>
  /^[a-zA-Z0-9_]{2,16}$/.test(nick);
