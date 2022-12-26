import { Conference } from "../../src/chapter8/memoizedRestaurantAPI.js";
import { ThirdParty } from "../../src/chapter8/ThirdPartyRestaurantAPI.js";

/**
 * TODO: getRestaurantsNearConference 함수를 애스팩트가 가미된 서드파티 API에 표출한다.
 */
describe('memoizedRestaurantsAPI',() => {
  'use strict';

  let api;
  let service;
  let returnedFromService;

  beforeEach(() => {
    api = ThirdParty.restaurantAPI();
    service = Conference.memoizedRestaurantAPI(api);
    returnedFromService = {};
  })

  describe('getRestaurantsNearConference(cuisine)', () => {
    it('기대 인자를 넘겨 API의 getRestaurantsNearConference를 실행한다.', () => {
      const cuisine = '분식';

      spyOn(api, 'getRestaurantsNearConference');
      service.getRestaurantsNearConference(cuisine);

      const args = api.getRestaurantsNearConference.calls.argsFor(0);
      expect(args[0]).toEqual(cuisine);
    });

    it('서드파티 API의 반환값을 반환한다.', () => {
      spyOn(api, 'getRestaurantsNearConference').and.returnValue(returnedFromService);

      const value = service.getRestaurantsNearConference("Asian Fusion");
      expect(value).toBe(returnedFromService);
    });

    it("같은 요리를 여러 번 요청해도 API는 한 번만 요청한다.", () => {
      const cuisine = "분식";

      spyOn(api, "getRestaurantsNearConference").and.returnValue(returnedFromService);

      let iter = 5;
      for (let i = 0; i < iter; i += 1) {
        const value = service.getRestaurantsNearConference(cuisine);
      }

      expect(api.getRestaurantsNearConference.calls.count()).toBe(1);
    })

    it("같은 요리를 여러 번 요청해도 같은 값으로 귀결한다.", () => {
      const cuisine = "한정식";

      spyOn(api, "getRestaurantsNearConference").and.returnValue(returnedFromService);

      let iter = 5;
      for (let i = 0; i < iter; i += 1) {
        const value = service.getRestaurantsNearConference(cuisine);
        expect(value).toBe(returnedFromService);
      }
    })
  })
})