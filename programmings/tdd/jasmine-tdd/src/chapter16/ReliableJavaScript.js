import Aop from "../chapter2/AOP.js";

export const ReliableJavaScript = {};

ReliableJavaScript.ContractRegistry = function() {
  'use strict';

  const registry = {};

  return {
    define(contractName, evaluator) {
      if (typeof contractName !== 'string') {
        throw new Error(this.messages.nameMustBeString);
      }
      if (typeof evaluator !== 'function') {
        throw new Error(this.messages.evaluatorMustBeFunction);
      }

      registry[contractName] = evaluator;
    },

    fulfills(contractName, obj) {
      if (!registry[contractName]) {
        throw new Error(this.getMessageForNameNotRegistered(contractName));
      }

      return registry[contractName](obj)
    },

    assert(contractName, obj) {
      if (!this.fulfills(contractName, obj)) {
        throw new Error(this.getMessageForFailedContract(contractName, obj))
      }
    },

    messages: {
      nameMustBeString: '규약명은 문자열이어야 한다.',
      evaluatorMustBeFunction: '평가기는 함수만 가능하다.',
      nameMustBeRegistered: "'_'은 레지스트리에 없는 규칙이다.",
      failedContract: "다음 객체는 '_' 규약 위반이다.",
      funcNameMustBeString: "함수의 이름은 반드시 문자열이어야 한다.",
      funcObjMustBeObject: "함수의 객체는 반드시 오브젝트 타입이어야 한다." 
    },

    getMessageForNameNotRegistered(contractName) {
      return this.messages.nameMustBeRegistered.replace('_', contractName);
    },

    getMessageForFailedContract(contractName, obj) {
      return this.messages.failedContract.replace('_', contractName) + obj;
    },

    attachReturnValidator(funcName, funcObj, contractName) {
      const self = this;

      if (typeof funcName !== 'string') {
        throw new Error(self.messages.funcNameMustBeString);
      }

      if (typeof funcObj !== 'object') {
        throw new Error(self.messages.funcObjMustBeObject);
      }

      if (typeof contractName !== 'string') {
        throw new Error(self.messages.nameMustBeString);
      }

      Aop.around(
        funcName,
        function(targetInfo) {
          const ret = Aop.next(targetInfo);
          self.assert(contractName, ret);

          return ret;
        },
        funcObj  
      )
    }
  }
}