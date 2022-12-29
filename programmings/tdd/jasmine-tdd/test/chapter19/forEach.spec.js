import { ReliableJavaScript } from "../../src/chapter19/ReliableJavaScript.js";
import { Conference, objWithLateAspect } from "../../src/chapter19/Conference.js";

describe('forEach(callbackFn, thisObj)', () => {
  'use strict';

  it("호춣한 객체에 숫자형 length property가 없는 경우 에러를 던진다.", () => {
    let obj;
    const withNoGoodLength = [
      { a: 1 },
      { length: 'nonNumber' },
      { length: Infinity },
      { length: -1 },
      { length :1.5 }
    ]

    function expectThrow(obj) {
      expect(() => {
        obj.forEach(function() {})
      }).toThrowError(Conference.polyfills.messages.invalidParamType);
    }

    for (let i = 0;  i < withNoGoodLength.length; i += 1) {
      obj = withNoGoodLength[i];

      ReliableJavaScript.utilities.borrow(obj, objWithLateAspect, 'forEach');

      expectThrow(obj);
    }
  });

})

describe('Aspect 적용', () => {
  'use strict';
  function doNothing() {

  } 
  
  it('빌린 후 애스팩트를 적용할 경우', () => {
    expect(function() {
      objWithLateAspect.forEach(doNothing);
    }).toThrowError(Conference.polyfills.messages.invalidParamType);
  })
})