import Aop from "../chapter2/AOP.js";

export const ReliableJavaScript = {};

ReliableJavaScript.ContractRegistry = function() {
  'use strict';

  const registry = {};

  if (!(this instanceof ReliableJavaScript.ContractRegistry)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.newRequired);
  }

  this.define = function(contractName, evaluator) {
    if (typeof contractName !== 'string' ) {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
    }
    if (typeof evaluator !== 'function') {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.evaluatorMustBeFunction);
    }
    registry[contractName] = evaluator;
    return this;
  };

  this.fulfills = function fulfills(contractName, obj) {
    if (!registry[contractName]) {
      throw new Error(this.getMessageForNameNotRegistered(contractName));
    }
    const res = registry[contractName](obj);

    if (typeof res !== 'boolean') {
      throw new Error('반환 타입은 Boolean이어야 합니다.')
    }

    return registry[contractName](obj);
  };
};

ReliableJavaScript.ContractRegistry.prototype.assert =
function assert(contractName,obj) {
  if (!this.fulfills(contractName,obj)) {
    throw new Error(this.getMessageForFailedContract(contractName, obj));
  }
  return this;
}; 

ReliableJavaScript.ContractRegistry.prototype.multipleFulfills = function (validator, args) {
  const self = this;

  function validateWithContractNameString(v) {
    const contractNames = v.split(',').map(v => v.trim());

    for (let i = 0; i < contractNames.length; i += 1) {
      if (contractNames[i].length === 0) continue;

      if (!self.fulfills(contractNames[i], args[i])) {
        return false;
      }
    }

    return true;
  }
  
  if (typeof validator === 'string') {
    return self.fulfills(validator, args)
  }

  if (Array.isArray(validator)) {
    for (let i = 0; i < validator.length; i += 1) {
      if (validateWithContractNameString(validator[i])) {
        return true;
      }
    }

    return validator.length === 0 || false;
    // if(validator.length === 0) return true;

    // validator.forEach(function assertString(elem) {
    //   if (typeof elem !== 'string' ) {
    //     throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
    //   }
    // });
  } else if (
    typeof validator !== 'function' &&
    typeof validator !== 'string'
  ) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
  };

  if (
    !Array.isArray(args) &&
    (!args || typeof args !== 'object' || args.length === undefined)
  ) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.argsMustBeArrayLike);
  }

  if (typeof validator === 'function' ) {
    return validator.apply(self, args);
  }
};

ReliableJavaScript.ContractRegistry.prototype.attachReturnValidator = function(funcName, funcObj, contractName) {
  const self = this;
  if (typeof funcName !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcNameMustBeString);
  }
  if (typeof funcObj !== 'object') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcObjMustBeObject);
  }
  if (typeof contractName !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
  }

  Aop.around(
    funcName,
    function validateReturn(targetInfo) {
      const ret = Aop.next(targetInfo);
      self.assert(contractName, ret);

      return ret;
    }, 
    funcObj
  );

  return this;
};

ReliableJavaScript.ContractRegistry.prototype.multipleAssert = function(validator, args) {
  if(!this.multipleFulfills(validator, args)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.argsFailedContract);
  }

  return this;
}


ReliableJavaScript.ContractRegistry.prototype.defineMultiple = function (contracts) {
  const self = this;

  if (!Array.isArray(contracts)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.contractsArrayInvalid);
  }

  for (let i = 0; i < contracts.length; i += 1) {
    if (!contracts[i].name || !contracts[i].evaluator) {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.contractsArrayInvalid);
    }
  }

  contracts.forEach((c) => {
    self.define(c.name, c.evaluator);
  });

  return this;
};

ReliableJavaScript.ContractRegistry.prototype.attachArgumentsValidator = function(funcName, funcObj, validator) {
  const self = this;

  Aop.before(funcName, function () {
    self.multipleAssert(validator, arguments);
  }, funcObj);

  return this;
}


ReliableJavaScript.ContractRegistry.messages = {
  newRequired: '규약 레지스트리는 "new"로 인스턴스화해야 합니다',
  nameMustBeString: '규약명은 적어도 한 개의 문자로 이루어진 문자열이어야 합니다',
  evaluatorMustBeFunction: '평가기는 함수만 가능합니다',
  nameMustBeRegistered: "'_'은 레지스트리에 없는 규약입니다",
  funcNameMustBeString: '함수명은 반드시 공백 아닌 문자열이어야 합니다',
  funcObjMustBeObject: '장식할 객체는 반드시 객체여야 합니다',
  validatorsInvalid:
    '검사기 인자는 반드시 문자열, 문자열 배열, 각 규약명이 콤마로 구분된 목록, 함수 중 하나여야 합니다.',
  argsMustBeArrayLike: 'args 인자는 유사 배열 타입이어야 합니다',
  argsFailedContract: '규약을 위반한 인자입니다',
  failedContract: "다음 객체는 '_' 규약 위반입니다: ",
  contractsArrayInvalid: "규약 파라미터는 name 및 evaluator 두 프로퍼티를 가진 객체의 배열만 가능합니다"
};


ReliableJavaScript.ContractRegistry.prototype.getMessageForNameNotRegistered =
function getMessageForNameNotRegistered(
contractName) {
  return ReliableJavaScript.ContractRegistry.messages.nameMustBeRegistered
    .replace('_', contractName);
};

ReliableJavaScript.ContractRegistry.prototype.getMessageForFailedContract =
function getMessageForFailedContract(
contractName, obj) {
  return ReliableJavaScript.ContractRegistry.messages.failedContract
      .replace('_', contractName) + obj;
};

/**
 * 함수를 호출할 때마다 검사할 필요는 없다.
 * 함수를 처음 불러올 때에만 검사하면 그만이므로, 애스팩트를 활용한다.
 * TODO: 기존의 코드는 추후 규약에 대해 원하면 뺄 수 있도록 해야 한다.
 */
ReliableJavaScript.ContractRegistry.prototype.attachPreCallValidator = function(funcName, funcObj, contractName) {
  'use strict';
  const self = this;

  Aop.around(
    funcName,
    function(targetInfo) {
      self.assert(contractName, funcObj);
      return Aop.next.call(funcObj, targetInfo);
    },
    funcObj
  )

  return this;
}


/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/


// 시스템 정의 타입을 위한 규약 배열이다. 
// ReliableJavaScript.ContractRegistry.defineMultiple로
// 이 규약들을 레지스트리에 추가한다.
ReliableJavaScript.StandardContracts = (function() {
 
  //------------------
  // 기본 타입
  //------------------
  
  function isUndefined(obj) {
    return typeof obj === 'undefined';
  }
  
  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }
  
  function isString(obj) {
    return typeof obj === 'string';  
  }
  
  function isNumber(obj) {
    return typeof obj === 'number';
  }
  
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  
  function isObject(obj) {
    return typeof obj === 'object';
  }
  
  //-------------------
  // 준 기본 타입
  //-------------------
  
  function isArray(obj) {
    return Array.isArray(obj);
  }
  
  function isNonEmptyString(obj) {
    return isString(obj) && obj.length>0;
  }
  
  function isNonBlankString(obj) {
    return isString(obj) && /^ *$/.test(obj)===false;
  }
  
  // 출처: http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  function isInteger(obj) {
    return !isNaN(value) &&
      (function(x) { return (x | 0) === x; })(parseFloat(obj));
  }
  
  function isNonNegativeInteger(obj) {
    return isInteger(obj) && obj>=0;
  }
  
  function isNonNegativeNumber(obj) {
    return isNumberLike(obj) && obj >=0;
  }
  
  return [
    { name: 'undefined',          evaluator: isUndefined },
    { name: 'boolean',            evaluator: isBoolean },
    { name: 'string',             evaluator: isString },
    { name: 'number',             evaluator: isNumber },
    { name: 'function',           evaluator: isFunction },
    { name: 'object',             evaluator: isObject },
    { name: 'array',              evaluator: isArray },
    { name: 'nonEmptyString',     evaluator: isNonEmptyString },
    { name: 'nonBlankString',     evaluator: isNonBlankString },
    { name: 'integer',            evaluator: isInteger },
    { name: 'nonNegativeInteger', evaluator: isNonNegativeInteger },
    { name: 'nonNegativeNumber',  evaluator: isNonNegativeNumber },
  ];
  
}());

ReliableJavaScript.utilities = {};

ReliableJavaScript.utilities.borrow = function(borrower, donor, funcName) {
  'use strict';

  borrower[funcName] = function() {
    const args = Array.prototype.slice.call(arguments);
    return donor[funcName].apply(this, args);
  }
}

ReliableJavaScript.extend = function(target, mixin) {
  'use strict';

  if (!target || typeof(target) !== 'object') {
    throw new Error(ReliableJavaScript.extend.messages.targetNotObject);
  }

  if (!mixin || typeof(mixin) !== 'object') {
    throw new Error(ReliableJavaScript.extend.messages.mixinNotObject);
  }

  for (let item in mixin) {
    if (mixin.hasOwnProperty(item)) {
      if (item in target) {
        throw new Error(ReliableJavaScript.extend.messages.triedToReplace + item);
      }
      target[item] = mixin[item]
    }
  }
};

ReliableJavaScript.extend.messages = {
  targetNotObject: "target은 객체가 아니다.", 
  mixinNotObject: "mixin은 객체가 아니다.",
  triedToReplace: "감히...?"
}