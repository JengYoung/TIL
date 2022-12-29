import { Conference } from "../../src/chapter19/Conference.js";
import "../../src/chapter19/OrderedObject.js";
import { ReliableJavaScript } from "../../src/chapter19/ReliableJavaScript.js";

describe('OrdredObject', () => {
  'use strict';

  let orderedObject;
  let result;

  function processKey(key, value) {
    if (typeof value !== 'function') {
      result = result * 100 + value;
    }
  }

  beforeEach(() => {
    orderedObject = new Conference.OrderedObject();
    result = 0;
  })


  
  describe('forEachKey(callbackFn)', () => {
    it('객체 안에 있는 각 키에 대한 콜백을 순서대로 호출한다.', () => {
      orderedObject.c = 11;
      orderedObject.a = 22;
      orderedObject.b = 33;
      orderedObject.forEachKey(processKey);

      expect(result).toBe(223311)
    });

    it('빌려올 수 있다.', () => {
      const borrower = { c: 11, a: 22, b: 33 };
      ReliableJavaScript.utilities.borrow(
        borrower, Conference.OrderedObject.prototype, 'forEachKey'
      );

      borrower.forEachKey(processKey);
      expect(result).toBe(223311);
    });
  });

  describe('trackedForEachKey(callbackFn)', () => {
    beforeEach(() => {
      orderedObject.c = 11;
      orderedObject.a = 22;
      orderedObject.b = 33;
    });

    describe('원래 객체에서', () => {
      it('객체 안에 있는 각 키에 대한 콜백을 순서대로 호출한다.', () => {
        orderedObject.trackedForEachKey(processKey);
        expect(result).toBe(223311);
      });

      it('각 프로퍼티를 몇 번 방문했는지 추적한다.', () => {
        const times = 2;
        for (let i = 0; i < times; i += 1) {
          orderedObject.trackedForEachKey(processKey);
        }
        expect(orderedObject.getIterationCount('a')).toBe(times);
        expect(orderedObject.getIterationCount('b')).toBe(times);
        expect(orderedObject.getIterationCount('c')).toBe(times);
      })
    });

    describe('빌려온 객체에서', () => {
      let borrower;
      
      beforeEach(() => {
        borrower = { c: 11, a: 22, b: 33 };
        /**
         * INFO: 항상 부수효과를 신경써야 한다. 
         * 프로토타입 메서드까지 통째로 빌려오는 것이 아니기 때문에 이러한 부수효과가 발생한다.
         */
        ReliableJavaScript.utilities.borrow(
          borrower, Conference.OrderedObject.prototype, 'trackedForEachKey'
        )
        ReliableJavaScript.utilities.borrow(
          borrower, Conference.OrderedObject.prototype, 'forEachKey'
        )
        ReliableJavaScript.utilities.borrow(
          borrower, orderedObject, 'incrementIterationCount'
        )
        ReliableJavaScript.utilities.borrow(
          borrower, orderedObject, 'getIterationCount'
        )
      });

      it('객체 안에 있는 각 키에 대한 콜백을 순서대로 호출한다.', () => {
        borrower.trackedForEachKey(processKey);
        expect(result).toBe(223311);
      });

      it('각 프로퍼티를 몇 번 방문했는지 추적한다.', () => {
        const times = 2;

        for (let i = 0; i < times; i += 1) {
          borrower.trackedForEachKey(processKey);
        }
        expect(borrower.getIterationCount('a')).toBe(times);
        expect(borrower.getIterationCount('b')).toBe(times);
        expect(borrower.getIterationCount('c')).toBe(times);
      });
    })
  })
})