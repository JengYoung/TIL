export const Conference = {};

Conference.simpleCache = function() {
  'use strict';

  const privateCache = {};

  function getCacheKey(key) {
    return JSON.stringify(key);
  }

  return {
    hasKey(key) {
      return privateCache.hasOwnProperty(getCacheKey(key));
    },

    // INFO: 캐시에 해당 키 값을 저장
    setValue(key, value) {
      privateCache[getCacheKey(key)] = value;
    },

    // 해당 키 값을 반환한다.
    getValue(key) {
      return privateCache[getCacheKey(key)];
    }
  }
}

Conference.caches = {}

// INFO: restaurantAPI.getRestaurantsWithinRadius 함수에서 캐시로 사용할 simpleCache(싱글톤) 생성
Conference.caches.RestaurantsWithinRadiusCache = (function() {
  'use strict';

  let instance = null;

  return {
    getInstance() {
      if (!instance) {
        instance = Conference.simpleCache()
      }

      return instance;
    }
  }
})()