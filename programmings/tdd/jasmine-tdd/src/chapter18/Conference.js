export const Conference = {};

Conference.polyfills = {};

Conference.polyfills.arrayForEach = function(callbackFn, thisObj) {
  'use strict';

  if (typeof callbackFn !== 'function') {
    throw new Error(Conference.polyfills.messages.thisIsNotFn(callbackFn))
  }

  for (let i = 0; i < this.length; i += 1) {
    callbackFn.call(thisObj, this[i], i, this);
  }
}

Conference.polyfills.messages = {
  thisIsNotFn(name) {
    return `${name}은(는) 함수가 아니다.`
  }
}

Conference.outgoingLinkClickHandler = function(clickRecorder) {
  'use strict';

  const handler = {
    linkClickRecorder: clickRecorder,
    handleClick() {
      const clickDetails = {};

      this.linkClickRecorder.recordClick(clickDetails);
    }
  }

  handler.handleClick = handler.handleClick.bind(handler);

  return handler;
}