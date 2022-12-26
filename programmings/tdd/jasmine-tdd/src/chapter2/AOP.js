const Aop = {
  around: function(fnName, advice, fnObj) {
    // 처음 버전이라 하는 일이 없다.
    const originalFn = fnObj[fnName];

    // console.log(fnObj, fnName, advice)

    fnObj[fnName] = function() {
      return advice.call(this, { fn: originalFn, args: arguments })
    }
  },
  // 함수에 캡슐화하여 구조를 보여주지 않게 하기 위한 도우미 함수.
  next: function(targetInfo) {
    return targetInfo.fn.apply(this, targetInfo.args);
  }
}

export default Aop