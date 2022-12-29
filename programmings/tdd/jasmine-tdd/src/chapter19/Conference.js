import Aop from "../chapter2/AOP.js";

export const Conference = {};

Conference.polyfills = {};

Conference.polyfills.forEachWithLateAspect = function(callbackFn, thisObj) {
  'use strict';

  if (typeof callbackFn !== 'function') {
    throw new Error(Conference.polyfills.messages.thisIsNotFn(callbackFn))
  }

  for (let i = 0; i < this.length; i += 1) {
    callbackFn.call(thisObj, this[i], i, this);
  }
}

export const objWithLateAspect = {};

/**
 * INFO indirection을 적용한다.
 * 한 번 더 함수를 감싸서, 진짜 함수를 apply로 실행하도록 하여 바인딩을 미루는 기법이다.
 */
objWithLateAspect.forEach = function() {
  const args = Array.prototype.slice.call(arguments);
  Conference.polyfills.forEachWithLateAspect.apply(this, args);
};

Aop.before('forEachWithLateAspect', function (obj) {
  if (
    typeof(obj) !== 'object' || 
    !(
      typeof this.length === 'number' && 
      isFinite(this.length) && 
      Math.floor(this.length) === this.length && 
      this.length >= 0
    )
  ) {
    throw new Error(Conference.polyfills.messages.invalidParamType);
  }
}, Conference.polyfills);


/***************************************************************************/
/***************************************************************************/
/***************************************************************************/


Conference.polyfills.arrayForEach = function(callbackFn, thisObj) {
  'use strict';

  if (typeof callbackFn !== 'function') {
    throw new Error(Conference.polyfills.messages.thisIsNotFn(callbackFn))
  }

  for (let i = 0; i < this.length; i += 1) {
    callbackFn.call(thisObj, this[i], i, this);
  }
}

Aop.before('arrayForEach', function (obj) {
  if (
    typeof(this) !== 'object' || 
    !(
      typeof this.length === 'number' && 
      isFinite(this.length) && 
      Math.floor(this.length) === this.length && 
      this.length >= 0
    )
  ) {
    throw new Error(Conference.polyfills.messages.invalidParamType);
  }
}, Conference.polyfills);


Conference.polyfills.messages = {
  thisIsNotFn(name) {
    return `${name}은(는) 함수가 아니다.`
  },
  invalidParamType: 'arrayForEach의 호출부는 유사 배열 타입이어야 한다.'
}
