import { Conference } from "../../src/chapter18/Conference.js";

describe('Conference.polyfills', () => {
  describe('arrayForEach(callbackFn[, thisObj])', () => {
    'use strict';

    let originalForEach;

    beforeEach(() => {
      originalForEach = Array.prototype.forEach;

      Array.prototype.forEach = Conference.polyfills.arrayForEach;
    })

    afterEach(() => {
      Array.prototype.forEach = originalForEach;
    });

    it('callbackFn이 함수가 아니면 에러를 던진다.', () => {
      const nonFunction = [
        undefined,
        "",
        {}
      ];

      for (let i = 0; i < nonFunction.length; i += 1) {
        expect(() => {
          [].forEach(nonFunction[i]);
        }).toThrowError(Conference.polyfills.messages.thisIsNotFn(nonFunction[i]));
      }
    })

    describe('thisObj가 없을 경우', () => {
      it('undefined를 콘텍스트로 callbackFn을 실행한다.', () => {
        const helper = {
          expectThisToBeWindow() {
            expect(this).toBe(window);
          }
        };

        spyOn(helper, 'expectThisToBeWindow').and.callThrough();

        [1].forEach(helper.expectThisToBeWindow);

        expect(helper.expectThisToBeWindow).toHaveBeenCalled();
      })

      it('예정된 인자들을 넘겨 callbackFn을 실행한다.', () => {
        const testArr = [{}];
        const callbackSpy = jasmine.createSpy();

        testArr.forEach(callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith(testArr[0], 0, testArr);
      })
    })

    describe('thisObj가 있을 경우', () => {
      it('thisObj를 콘텍스트로 callbackFn을 실행한다.', function() {
        const thisObj = {};

        const helper = {
          expectThisToBeThisObj: function() {
            expect(this).toBe(thisObj);
          }
        };

        spyOn(helper, 'expectThisToBeThisObj').and.callThrough();

        [1].forEach(helper.expectThisToBeThisObj, thisObj);

        expect(helper.expectThisToBeThisObj).toHaveBeenCalled();
      })

      it('예정된 인자들을 넘겨 callbackFn을 실행한다.', () => {
        const thisObj = {};
        const testArr = [{}];
        const callbackSpy = jasmine.createSpy();

        testArr.forEach(callbackSpy, thisObj);

        expect(callbackSpy).toHaveBeenCalledWith(testArr[0], 0, testArr);
      })
    })
  })
})