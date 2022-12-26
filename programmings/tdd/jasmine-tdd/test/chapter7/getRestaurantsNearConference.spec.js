import { ThirdParty } from "../../src/chapter7/ThirdPartyRestaurantAPI.js"

describe('ThirdParty.restaurantAPI() Aspect', () => {
  const api = ThirdParty.restaurantAPI();

  describe('getRestaurantsNearConference(cuisine)', () => {
    const returnFromUnderlyingFunction = 'random';
    const cuisine = "중화요리";

    beforeEach(() => {
      spyOn(api, 'getRestaurantWithinRadius').and.returnValue(returnFromUnderlyingFunction);
    });

    it('올바른 인자로 getRestaurantsWithinRadius를 호출한다.', () => {
      api.getRestaurantsNearConference(cuisine);
      expect(api.getRestaurantWithinRadius).toHaveBeenCalledWith('서울시 강북구', 0.5, cuisine);
    })

    it('getRestarantsWithinRadius로부터 받은 값을 반환한다.', () => {
      const res = api.getRestaurantsNearConference(cuisine);
      expect(res).toBe(returnFromUnderlyingFunction);
    });
  })
})