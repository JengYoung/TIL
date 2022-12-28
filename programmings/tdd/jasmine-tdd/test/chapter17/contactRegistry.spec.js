import { ReliableJavaScript } from "../../src/chapter17/ReliableJavaScript.js";

describe('ContractRegistry', () => {
  'use strict';

  let registry;

  const isArray = 'isArray';
  const arr = [1,2,3]

  beforeEach(() => {
    registry = new ReliableJavaScript.ContractRegistry();
    
    registry.define(isArray, Array.isArray);
  })
    
  describe('multipleFulfills(validator, args)', () => {
    describe('validator가 함수일 경우', () => {
      const args = ['a', 'b'];

      it('args에 대한 validator의 호출 결과를 반환한다.', () => {
        function isLength2() {
          return arguments.length === 2
        }

        function isLength3() {
          return arguments.length === 3
        }

        expect(registry.multipleFulfills(isLength2, args)).toBe(true);
        expect(registry.multipleFulfills(isLength3, args)).toBe(false);
      });

      it('registry를 콘텍스트로 validator를 호출한다.', () => {
        function calledOnRegistry() {
          expect(this).toBe(registry);
        }

        registry.multipleFulfills(calledOnRegistry, args);
      });
    })

    describe('validator가 문자열일 경우', () => {
      it('fulfills(validator, args)의 결과를 반환한다.', () => {
        const validator = '어떤 규약명';
        const args = ['a', 'b'];
        const returnFromFulfills = 'true or false';
        
        spyOn(registry, 'fulfills').and.returnValue(returnFromFulfills);
        expect(registry.multipleFulfills(validator, args)).toBe(returnFromFulfills);
        expect(registry.fulfills).toHaveBeenCalledWith(validator, args);
      })
    });

    describe('validator가 배열일 경우', () => {
      function passOrFail(contractName, arg) {
        return contractName === 'passes';
      }

      it('빈 배열이면 true를 반환한다.', () => {
        expect(registry.multipleFulfills([], [1,2,3])).toBe(true);
      })

      it('validator의 원소가 하나뿐인 배열이고 해당 규약이 모두 pass면 true를 반환한다.', () => {
        const validator = ['passes, passes, passes'];
        const args = [1,2,3];

        spyOn(registry, 'fulfills').and.callFake(passOrFail);
        
        expect(registry.multipleFulfills(validator, args)).toBe(true);
        expect(registry.fulfills).toHaveBeenCalledWith('passes', 1);
        expect(registry.fulfills).toHaveBeenCalledWith('passes', 2);
        expect(registry.fulfills).toHaveBeenCalledWith('passes', 3);
      })

      it('validator가 원소가 하나뿐인 배열이고 해당 규약 중 하나가 fail이면 false를 반환한다.', () => {
        const validator = ['passes,fails,passes'];
        const args = [1,2,3];

        spyOn(registry, 'fulfills').and.callFake(passOrFail);
        
        expect(registry.multipleFulfills(validator, args)).toBe(false);
        expect(registry.fulfills).toHaveBeenCalledWith('passes', 1);
        expect(registry.fulfills).toHaveBeenCalledWith('fails', 2);

        expect(registry.fulfills.calls.count()).toBe(2);
      })

      it('원소가 하나뿐인 배열에서 필요 이상 규약을 평가하지 않는다.', () => {
        const validator = ['passes,fails,passes'];
        const args = [1,2,3];

        spyOn(registry, 'fulfills').and.callFake(passOrFail);

        expect(registry.multipleFulfills(validator, args)).toBe(false);
        expect(registry.fulfills.calls.count()).toBe(2);
      })

      it('args가 콤마로 구분된 규약명 문자열의 배열 중 한 원소라도 지키면 규약을 지키는 것으로 본다.', () => {
        const validator = [
          'passes, fails',
          'passes, passes',
          'fails, fails',
        ];
        const args = [1,2];

        spyOn(registry, 'fulfills').and.callFake(passOrFail);
        expect(registry.multipleFulfills(validator, args)).toBe(true);
        expect(registry.fulfills.calls.count()).toBe(4);
      })
    })
  })

  describe('multipleAssert(validator, args)', () => {
    it('multipleFulfills(validator, args)가 false를 반환한다면 예외를 던진다.', () => {
      const validator = 'contractname';
      const args = [123];

      spyOn(registry, 'multipleFulfills').and.returnValue(false);
      expect(() => {
        registry.multipleAssert(validator, args);
      }).toThrowError(ReliableJavaScript.ContractRegistry.messages.argsFailedContract);
      expect(registry.multipleFulfills).toHaveBeenCalledWith(validator, args);
    })

    it('multiplaeFulfills(validator, args)가 ture를 반환하면 예외를 던지지 않는다.', () => {
      const validator = 'contractName';
      const args = [123];

      spyOn(registry, 'multipleFulfills').and.returnValue(true);
      registry.multipleAssert(validator, args);
      expect(registry.multipleFulfills).toHaveBeenCalledWith(validator, args);
    })

    it('체이너블한 registry를 반환한다.', () => {
      expect(registry.multipleAssert(isArray, [])).toBe(registry);
    })
  })

  // INFO: 인자 체크 기능을 애스팩트로 묶는다.
  describe('attachArgumentsValidator(funcName, funcObj, validator)', () => {
    describe('Aspect 기능', () => {
      let obj;

      let funcName = 'func';
      let funcObj;
      
      const isString = 'isString';
      const isLetter = 'isLetter'; 
      const hasLength='hasLength';

      const contractNames = [isString, isLetter, hasLength];
      beforeEach(() => {
        obj = {
          prop: 123,
          func() {
            return arguments[0] + arguments[1];
          }
        }

        funcObj = {};

        funcObj[funcName] = function() {
          return Array.prototype.slice.call(arguments, 0);
        };
      })

      it('registry.multipleAssert(validator, arguments)를 호출한다.', () => {
        function validator(args) {
          return this.prop === 123;
        }

        registry.attachArgumentsValidator('func', obj, validator);

        spyOn(registry, 'multipleAssert').and.callFake((val, args) => {
          expect(val).toBe(validator);
          expect(args.length).toBe(2);
          expect(args[0]).toBe('a');
          expect(args[1]).toBe('b');
        })
        obj.func('a', 'b');
        expect(registry.multipleAssert).toHaveBeenCalled();
      });

      it('함수는 정상적으로 실행 및 반환시킨다.', () => {
        function validator(args) {
          return true;
        }

        registry.attachArgumentsValidator('func', obj, validator);
        spyOn(registry, 'multipleAssert').and.returnValue(undefined)
        expect(obj.func('a', 'b')).toBe('ab');
      })

      it('체이너블한 registry를 반환한다.', () => {
        expect(registry.attachArgumentsValidator(funcName, funcObj, contractNames))
      })
    });
  })
})