import DIContainer from '../../src/chapter2/DIContainer.js'

describe('DIContainer', () => {
  let container;

  beforeEach(() => {
    container = new DIContainer();
  })

  describe('register(name, dependencies, func)', () => {
    it('인자가 하나라도 빠졌거나 타입이 잘못되면 에러를 던진다', () => {
      const badArgs = [
        [],
        ['Name'],
        ['Name', ['Dependency1', 'Dependency2']],
        ['Name', function() {}],
        [1, ['a', 'b'], function () {}],
        ['Name', [1,2], function() {}],
        ['Name', ['a', 'b'], 'should be a function']
      ];

      badArgs.forEach((args) => {
        expect(function() {
          container.register.apply(container, args);
        }).toThrowError(container.messages.registerRequiresArgs);
      })
    })

    it('성명이 등록되어 있지 않다면 undefined를 반환한다', () => {
      expect(container.get('notDefined')).toBeUndefined();
    })

    it('등록된 함수를 실행한 결과를 반환한다', () => {
      const name = 'MyName';
      const returnFromRegisteredFunction = "sth";

      container.register(name, [], function() {
        return returnFromRegisteredFunction;
      })

      expect(container.get(name)).toBe(returnFromRegisteredFunction);
    })
  })

  describe('get(name)', function() {
    it('등록된 함수에 의존성을 제공한다', function() {
      let main = 'main';
      let mainFunc;
      let dep1 = 'dep1';
      let dep2 = 'dep2';

      container.register(main, [dep1, dep2], function(dep1Func, dep2Func) {
        return function() {
          return dep1Func() + dep2Func();
        }
      });

      container.register(dep1, [], function() {
        return function() {
          return 1;
        }
      });

      container.register(dep2, [], function() {
        return function() {
          return 2;
        }
      });

      mainFunc = container.get(main);
      expect(mainFunc()).toBe(3);
    })
  }),

  it('의존성을 재귀적으로 제공한다', function() {
    const level1 = 'one';
    const level2 = 'two';
    const level3 = 'three';
    const result = [];
    
    container.register(level1,[level2], function(level2func) {
      return function() {
        result.push(level1);
        level2func();
      };
    });
    container.register(level2,[level3], function(level3func) {
      return function() {
        result.push(level2);
        level3func();
      };
    });
    container.register(level3,[], function() {
      return function() {
        result.push(level3);
      };
    });

    container.get(level1)();
    expect(result).toEqual([level1,level2,level3]);
  });
})