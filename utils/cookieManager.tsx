import { parseCookies, setCookie, destroyCookie } from 'nookies';

/**
 * @description Module Cookies - Manage cookies front side
 * @module Cookies
 */
const cookieManager = {
  /**
   * @description Set a cookie with a pair name / value (and days)
   * @param {String} cname Name of the cookie you want to update
   * @param {String} cvalue The value of the cookie you want to update
   * @param {Integer} expireTime The TTL of the cookie
   * @param {Object} context The context (req)
   */
  set(cname, cvalue, expireTime, ctx = {}) {
    const d = new Date();
    d.setTime(d.getTime() + expireTime);
    const expires = 'expires=' + d.toUTCString();
    setCookie(ctx, cname, cvalue, {
      maxAge: expires,
      path: '/',
    });
  },
  /**
   * @description Return a cookie value from its name
   * @param {String} cname The name of the cookie you want to check
   * @param {Object} context The context (req)
   */
  get(cname, ctx = {}) {
    let cookies;
    if (ctx !== {}) cookies = parseCookies(ctx);
    cookies = parseCookies(ctx);
    return cookies[cname] || false;
  },
  /**
   * @description Return all cookies value
   * @param {Object} context The context (req)
   */
  getAll(ctx = {}) {
    if (ctx !== {}) return parseCookies(ctx);
    return parseCookies(ctx);
  },
  /**
   * @description Check if a cookie is set or not
   * @param {String} cname Quickly return a validity for a setted cookie
   * @param {Object} context The context (req)
   */
  isSet(cname, ctx = {}) {
    return !!(
      cookieManager.get(cname, ctx) && cookieManager.get(cname, ctx).length > 0
    );
  },
  /**
   * @description Destroy a cookie
   * @param {String} cname Quickly return a validity for a setted cookie
   * @param {Object} context The context (req)
   */
  destroy(cname, ctx: any = {}) {
    destroyCookie(ctx, cname);
  },
};

export default cookieManager;
