import Aop from "../../src/chapter2/AOP.js";
import { Aspects } from "../../src/chapter9/returnValueCache.js";
import { Conference } from "../../src/chapter9/caches.js";

describe('returnValueCache', () => {
  'use strict';

  let testObject;
  let testValue;
  let args;
  let spyReference;

  function createATestObject() {
    const obj = {
      testFunction(arg) {
        return testValue;
      }
    };

    spyOn(obj, 'testFunction').and.callThrough();

    obj.spyReference = obj.testFunction;

    return obj;
  }

  describe('advice(targetInfo)', () => {
    it('주입된 캐시를 인스턴스 간에 공유할 수 있다.', () => {
      const sharedCache = Conference.simpleCache();
      
      const object1 = createATestObject();
      const object2 = createATestObject();

      Aop.around('testFunction', new Aspects.returnValueCache(sharedCache).advice, object1);
      Aop.around('testFunction', new Aspects.returnValueCache(sharedCache).advice, object2);

      object1.testFunction(args);
      expect(object2.testFunction(args)).toBe(testValue);
      expect(object2.spyReference.calls.count()).toBe(0);
    })
  })

  describe('Conference.caches.RestaurantsWithRadiusCache', () => {
    'use strict';
    
    describe('getInstance', () => {
      it('항상 동일한 인스턴스를 반환한다.', () => {
        expect(Conference.caches.RestaurantsWithinRadiusCache.getInstance())
        .toBe(Conference.caches.RestaurantsWithinRadiusCache.getInstance())
      })
    })
  })
})