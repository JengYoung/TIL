import Aop from "../chapter2/AOP.js";

export const Aspects = {};

Aspects.returnValueCache = function(sharedCache) {
  'use strict';

  const cache = sharedCache || {};

  return {
    // around를 통해서 래핑할 함수와 인자가 분리되어 있는 객체로 치환되었다.
    advice({ fn, args }) {
      const cacheKey = JSON.stringify(args);

      if (cache.hasOwnProperty(cacheKey)) {
        return cache[cacheKey];
      }

      const returnValue = Aop.next({ fn, args });
      cache[cacheKey] = returnValue;

      return returnValue;
    }
  }
}