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