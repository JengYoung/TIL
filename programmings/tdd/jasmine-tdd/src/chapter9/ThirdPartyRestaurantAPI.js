import Aop from "../chapter2/AOP.js";
import { Aspects } from "./returnValueCache.js";

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
  // 반환값을 수정해야 할 함수
  'restaurantAPI',

  // 반환값을 수정하는 함수
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {
    'use strict';
    
    // Thirdparty.restaurantAPI()가 반환할 original API
    const api = Aop.next.call(this, targetInfo);

    // INFO: getRestaurantsWithinRadius 함수를 장식하여 메모이제이션 추가
    Aop.around('getRestaurantsWithinRadius', Aspects.returnValueCache().advice, api);

    return api;
  },
  ThirdParty
);

Aop.around(
  'restaurantAPI',

  function addGetRestaurantsNearConference(targetInfo) {
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