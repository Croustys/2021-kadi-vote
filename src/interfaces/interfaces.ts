export interface AppProps {}
export interface AccountProps {
  id: string;
  env: string;
  homeAccId: string;
  token: object;
  idTokenClaims: object;
  name: string;
  sid: unknown;
  userName: string;
}
export interface dataProps {
  uniqueId: string;
  account: AccountProps;
  expiresOn: object;
  idToken: object;
}
export interface msalProps {
  account: AccountProps;
  authResponseCallback: object;
  authorityInstance: object;
  cacheStorage: object;
  clientId: string;
  config: object;
  errorReceivedCallback: unknown;
  inCookie: boolean;
  logger: object;
  telemetryManager: object;
  tokenReceivedCallback: unknown;
}