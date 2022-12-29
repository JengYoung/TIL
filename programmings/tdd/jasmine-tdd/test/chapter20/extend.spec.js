import { ReliableJavaScript } from "../../src/chapter20/ReliableJavaScript.js";

describe('ReliableJavaScript.extend()', () => {
  'use strict';

  const notObjects = ["", null, undefined, 1];

  it('target 인자가 객체가 아닐 경우 예외를 던진다.', () => {
    notObjects.forEach(notObj => {
      expect(() => {
        ReliableJavaScript.extend(notObj, {});
      }).toThrowError(ReliableJavaScript.extend.messages.targetNotObject);
    })
  });

  it('mixin 인자가 객체가 아닐 경우 예외를 던진다.', () => {
    notObjects.forEach(notObj => {
      expect(() => {
        ReliableJavaScript.extend({}, notObj);
      }).toThrowError(ReliableJavaScript.extend.messages.mixinNotObject);
    })
  })

  it('mixin이 빈 객체일 경우 target을 변경시키지 않는다.', () => {
    const target = {
      prop1: 'property1',
      method1() {
        return 'method1'
      }
    };

    const method = target.method1;

    ReliableJavaScript.extend(target, {});

    expect(Object.keys(target).sort()).toEqual(["method1", "prop1"]);

    expect(target.prop1).toEqual("property1");
    expect(target.method1).toBe(method);
  })

  it('빈 target에 프로퍼티를 추가하면 mixin처럼 나와야 한다.', () => {
    const target = {};

    const mixin = {
      prop1: 'property 1',
      prop2: 'property 1',
      method1() {
        return 'method 1'
      },
      method2() {
        return 'method 1'
      }
    }

    ReliableJavaScript.extend(target, mixin);

    expect(target).toEqual(mixin);
  })

  it('mixin이 상속한 프로퍼티는 추가하지 않는다.', () => {
    const target = {};

    const mixinBase = {
      baseProperty: '베이스 프로퍼티',
      baseMethod() {
        return '베이스 메서드'
      }
    };
    
    /**
     * INFO: mixinBase를 프로토타입으로 mixin 객체를 생성한다.
     */
    const mixin = Object.create(mixinBase);

    mixin.mixinProperty = '믹스인 프로퍼티';
    mixin.mixinMethod = function() {
      return '믹스인 메서드'
    }

    ReliableJavaScript.extend(target, mixin);

    /**
     * INFO: target에는 오직 mixin 객체의 프로퍼티와 메서드만 있다. 프로토타입 메서드는 포함되지 않는다.
     */
    expect(Object.keys(target).sort()).toEqual(['mixinMethod', 'mixinProperty'])
  })

  it('mixin이 자신의 프로퍼티를 교체하려고 하면 "감히...?"라는 말과 함께 예외를 던진다.', () => {
    const target = {
      prop1: 'property 1', 
      method1() {
        return 'method 1'
      }
    };

    const mixin = {
      prop2: 'property 2',
      method1() {
        return 'method 1 in mixin'
      }
    };

    expect(() => {
      ReliableJavaScript.extend(target, mixin);
    }).toThrowError(ReliableJavaScript.extend.messages.triedToReplace + 'method1')
  })

  it('mixin이 상속한 프로퍼티를 교체하려고 하면 예외를 던진다.', () => {
    const targetBase = {
      baseProperty: "베이스 프로퍼티",
      baseMethod() {
        return "베이스 메서드"
      },
    };

    const target = Object.create(targetBase);

    const mixin = {
      baseProperty: "믹스인 프로퍼티",
      method2() {
        return "믹스인 메서드"
      },
    }

    expect(() => {
      ReliableJavaScript.extend(target, mixin);
    }).toThrowError(ReliableJavaScript.extend.messages.triedToReplace + 'baseProperty')
  })
})