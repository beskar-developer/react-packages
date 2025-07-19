import { AutoBind } from "@shared-vendor/types";

import { OHE_HOUR } from "@shared-vendor/constants";

import { cookie } from "@shared-vendor/services";

type WithResolvers = ReturnType<typeof Promise.withResolvers<string>>;

const DEFAULT_CALLBACK = () => {};

class Token {
  private static readonly ACCESS_KEY = "access-token";
  private static readonly REFRESH_KEY = "refresh-token";
  private static readonly ACCESS_TTL = OHE_HOUR;
  private static readonly REFRESH_TTL = 24 * OHE_HOUR;
  readonly ACCESS_HEADER_KEY = `x-${Token.ACCESS_KEY}`;
  private onRequestAccessTokenCallback = DEFAULT_CALLBACK;
  private isRequestingRefreshToken = false;

  private resolve: WithResolvers["resolve"] = DEFAULT_CALLBACK;
  private reject: WithResolvers["reject"] = DEFAULT_CALLBACK;

  private static calculateExpires(ttl: number) {
    return new Date(Date.now() + ttl);
  }

  private createResolvers() {
    const { resolve, reject, promise } = Promise.withResolvers<string>();

    this.resolve = resolve;
    this.reject = reject;

    return promise;
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
    if (!this.isRequestingRefreshToken) {
      this.isRequestingRefreshToken = true;

      this.onRequestAccessTokenCallback();
    }

    const promise = this.createResolvers();

    return promise;
  }

  respondAccessToken(token: string) {
    this.setAccessToken(token);

    this.isRequestingRefreshToken = false;

    this.resolve(token);
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
    this.isRequestingRefreshToken = false;

    this.removeAccessToken();
    this.removeRefreshToken();

    this.reject();
  }

  isAuthenticated() {
    return this.getRefreshToken();
  }
}

export default new Token();
