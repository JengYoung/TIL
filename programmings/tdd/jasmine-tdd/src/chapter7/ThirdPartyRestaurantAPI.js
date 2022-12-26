import Aop from "../chapter2/AOP.js";

export const ThirdParty = {};

ThirdParty.restaurantAPI = function() {
  "use strict";

  return {
    getRestaurantWithinRadius(address, radiusMiles, cuisine) {
      return [
        {
          name: "꿈꾸는 타자기",
          address: "서울 강북구에 있었다 🫶🏻"
        }
      ]
    }
  }
}

Aop.around(
  'restaurantAPI',
  function addGetRestaurantNearConference(targetInfo) {
    'use strict';
    
    const api = Aop.next.call(this, targetInfo);

    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantWithinRadius('서울시 강북구', 0.5, cuisine);
    }

    api.getRestaurantsNearConference = api.getRestaurantsNearConference || getRestaurantsNearConference;

    return api;
  },
  ThirdParty
)