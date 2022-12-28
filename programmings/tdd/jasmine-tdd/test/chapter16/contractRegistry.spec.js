import { ReliableJavaScript } from "../../src/chapter16/ReliableJavaScript.js";
import "../../src/chapter16/ReliableJavaScript.js"
import "../../src/chapter16/attendeeContracts.js"

describe('ContractRegistry', () => {
  'use strict';

  let registry;

  const isArray = 'isArray';
  const arr = [1,2,3]

  beforeEach(() => {
    registry = ReliableJavaScript.ContractRegistry();
    registry.define(isArray, Array.isArray);
  })

  describe('define(contractName, evaluator)', () => {
    it('contractName이 문자열이어야 한다. 그렇지 않으면 에러를 던진다.', () => {
      expect(() => {
        registry.define(undefined, () => {});
      }).toThrowError(registry.messages.nameMustBeString);
    });

    it('evaluator가 함수가 아니면 예외를 던진다.', () => {
      expect(() => {
        registry.define('myContract', 'not function')
      }).toThrowError(registry.messages.evaluatorMustBeFunction)
    });

    it('contractName이 문자열이고 evaluator가 함수면 예외를 던지지 않는다.', () => {
      expect(() => {
        registry.define('myContract', () => {})
      }).not.toThrowError();
    })
  })

  describe('method: fulfill(contractName, obj)', () => {
    it('contractName이 레지스트리에 없으면 예외를 던진다.', () => {
      function expectThrow(contractName) {
        expect(() => {
          registry.fulfills(contractName, {})
        }).toThrowError(
          registry.getMessageForNameNotRegistered(contractName)
        )
      }

      [undefined, 'abc'].forEach(expectThrow);
    })

    // INFO: fulfills 메서드가 규약 지킴 여부를 ture/false로 반환하는지 테스트하는 용도이다.
    it('객체가 규약을 지키면 true를 반환한다.', () => {
      expect(registry.fulfills(isArray, arr)).toBe(true);
    })
    it('객체가 규약을 위반하면 false를 반환한다.', () => {
      expect(registry.fulfills(isArray, 'not an array')).toBe(false);
    })
  })

  describe('assert(contractName, obj)', () => {
    it('fulfills(contractName, obj)에 기반을 두어야 한다.', () => {  
      spyOn(registry, 'fulfills').and.callThrough();
      registry.assert(isArray, arr);
      
      expect(registry.fulfills).toHaveBeenCalledWith(isArray, arr);
    });

    it('객체가 규약을 지키면 예외를 던지지 않는다.', () => {
      registry.assert(isArray, arr);
    })

    it('객체가 규약을 위반하면 예외를 던진다.', () => {
      const notAnArray = 'example';

      expect(() => {
        registry.assert(isArray, notAnArray);
      }).toThrowError(registry.getMessageForFailedContract(isArray, notAnArray));
    })
  })

  describe('attachReturnValidator(funcName, funcObj, isArray)', () => {
    const funcName = 'func';
    const returnValue = [1, 2, 3];
  
    let funcObj;
  
    beforeEach(() => {
      funcObj = {};
      funcObj[funcName] = function() {
        return returnValue;
      }
    });
  
    describe('Aspect 기능', () => {
      it('반환값이 규약을 지키면 이를 반환한다.', () => {
        registry.attachReturnValidator(funcName, funcObj, isArray);
        expect(funcObj[funcName]()).toEqual(returnValue);
      })
  
      it('반환값이 규약을 위반하면 예외를 던진다.', () => {
        const isNumber = 'isNumber';
        
        registry.define(isNumber, (ret) => {
          return typeof ret === 'number';
        });

        registry.attachReturnValidator(funcName, funcObj, isNumber);

        expect(() => {
          funcObj[funcName]();
        }).toThrowError(registry.getMessageForFailedContract(isNumber, returnValue));
      })
    })
  })
})
