export const Conference = {};

Conference.memoizedRestaurantAPI = function(thirdPartyAPI) {
  'use strict';

  const api = thirdPartyAPI;
  const cache = {};

  return {
    getRestaurantsNearConference(cuisine) {
      if (cache.hasOwnProperty(cuisine)) {
        return cache[cuisine];
      }

      const returnedPromise = api.getRestaurantsNearConference(cuisine);
      cache[cuisine] = returnedPromise;
      
      return returnedPromise;
    }
  }
}