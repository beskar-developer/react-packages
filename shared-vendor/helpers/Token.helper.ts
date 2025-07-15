import { AutoBind } from "@shared-vendor/types";

import { ONE_DAY, ONE_MINUTE } from "@shared-vendor/constants";

import { cookie } from "@shared-vendor/services";

const DEFAULT_CALLBACK = () => {};

const { promise, resolve } = Promise.withResolvers<string>();

class Token {
  private static readonly ACCESS_KEY = "access-token";
  private static readonly REFRESH_KEY = "refresh-token";
  private static readonly ACCESS_TTL = 15 * ONE_MINUTE;
  private static readonly REFRESH_TTL = ONE_DAY;
  readonly ACCESS_HEADER_KEY = `x-${Token.ACCESS_KEY}`;
  private onRequestAccessTokenCallback = DEFAULT_CALLBACK;

  private static calculateExpires(ttl: number) {
    return new Date(Date.now() + ttl);
  }

  setAccessToken(token: string) {
    return cookie.set(Token.ACCESS_KEY, token, {
      expires: Token.calculateExpires(Token.ACCESS_TTL),
    });
  }

  getAccessToken() {
    return cookie.get(Token.ACCESS_KEY);
  }

  removeAccessToken() {
    return cookie.remove(Token.ACCESS_KEY);
  }

  setRefreshToken(token: string) {
    return cookie.set(Token.REFRESH_KEY, token, {
      expires: Token.calculateExpires(Token.REFRESH_TTL),
    });
  }

  getRefreshToken() {
    return cookie.get(Token.REFRESH_KEY);
  }

  removeRefreshToken() {
    return cookie.remove(Token.REFRESH_KEY);
  }

  async requestAccessToken() {
    this.onRequestAccessTokenCallback();

    return promise;
  }

  respondAccessToken(token: string) {
    this.setAccessToken(token);

    resolve(token);
  }

  @AutoBind
  clearRequest() {
    this.onRequestAccessTokenCallback = DEFAULT_CALLBACK;
  }

  @AutoBind
  onRequestAccessToken(callback: () => void) {
    this.onRequestAccessTokenCallback = callback;

    return this.clearRequest;
  }

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export default new Token();
