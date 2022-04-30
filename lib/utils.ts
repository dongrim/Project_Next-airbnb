// String "token=value" to Object { token: "value" }

export const cookieStringToObject = (cookieString) => {
  const cookies = {};
  if (cookieString) {
    const itemString = cookieString.split(/\s*;\s*/);
    itemString.forEach((pairs) => {
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join('=');
    });
  }
  return cookies;
};
