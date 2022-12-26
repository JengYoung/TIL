import Aop from "../chapter2/AOP.js";
import { Conference } from "./caches.js";
import { Aspects } from "./returnValueCache.js";
import { ThirdParty } from "./ThirdPartyRestaurantAPI.js";

// INFO: getRestaurantsWithinRadius에 메모이제이션 패턴 적용
Aop.around(
  'restaurantAPI',
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {
    // ThirdParty.restaurantAPI()가 반환한 원본 API
    const api = Aop.next.call(targetInfo);

    // INFO: 싱글톤 캐시 인스턴스를 가져온다.
    const cache = Conference.caches.RestaurantsWithinRadiusCache.getInstance();

    // INFO: getRestaurantsWithinRadius 함수를 장식하여 메모이제이션(공유 캐시) 추가
    Aop.around('getRestaurantsWithinRadius', Aspects.returnValueCache(cache).advice, api);

    return api;
  },
  ThirdParty
)