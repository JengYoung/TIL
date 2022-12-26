import Aop from "../../src/chapter2/AOP.js";
import { Aspects } from "../../src/chapter8/returnValueCache.js";

describe('returnValueCache', () => {  
  'use strict';

  let testObject;
  let testValue;
  let args;
  let spyReference;
  let testFunctionExecutionCount;

  beforeEach(() => {
    testFunctionExecutionCount = 0;
    testValue = {};
    testObject = {
      testFunction(arg) {
        return testValue;
      }
    };

    spyOn(testObject, 'testFunction').and.callThrough();

    spyReference = testObject.testFunction;

    Aop.around('testFunction', Aspects.returnValueCache().advice, testObject);

    args = [{ key: 'value' }, "someValue"];
  })

  describe('advice(targetInfo)', () => {
    it('첫 번째 실행 시 장식된 함수의 반환값을 반환한다.', () => {
      const value = testObject.testFunction.apply(testObject, args);
      expect(value).toBe(testValue);
    });

    it('여러 번 실행 시 장식된 함수의 반환값을 반환한다.', () => {
      const iter = 3;
      for(let i = 0; i < iter; i += 1) {
        const value = testObject.testFunction.apply(testObject, args);
        expect(value).toBe(testValue);
      }
    })

    it('같은 키 값으로 여러 번 실행해도 장식된 함수만 실행한다.', () => {
      const iter = 3;

      for (let i = 0; i < iter; i += 1) {
        const value = testObject.testFunction.apply(testObject, args);
        expect(value).toBe(testValue);
      }

      expect(spyReference.calls.count()).toBe(1);
    })

    it('고유한 각 키 값마다 꼭 한 번씩 장식된 함수를 실행한다', () => {
      const keyValues = ['value1', 'value2', 'value3'];

      keyValues.forEach((arg) => {
        const value = testObject.testFunction(arg)
      })

      keyValues.forEach((arg) => {
        const value = testObject.testFunction(arg);
      })

      expect(spyReference.calls.count()).toBe(keyValues.length);
    })
  })
})