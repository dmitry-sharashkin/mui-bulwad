export function getAccessToken() {
  const cookiesArr = document.cookie.split(";");
  const tokenCookie = cookiesArr.find((cookie) =>
    cookie.includes("access_token")
  );
  let token;
  if (tokenCookie) {
    const tokenData = tokenCookie?.split("=");
    token = tokenData[1];
  }
  return token;
}
export function clearAccessToken() {
  document.cookie = "access_token=;";
}

export function setAccessToken(token: string) {
  document.cookie = `access_token=${token};`;
}
