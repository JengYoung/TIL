export const Conference = {};

Conference.mixins = {};

Conference.mixins.idMixin = function() {
  'use strict';

  return {
    id: undefined,
    getId() {
      return this.id;
    },
    setId(idValue) {
      this.id = idValue;
    }
  }
}

/**
 * INFO: 함수형 믹스인을 통해 믹스인 패턴을 구현해본다.
 */
Conference.mixins.addId = function() {
  'use strict';

  let id;

  if ('getId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + 'getId');
  }

  if ('setId' in this) {
    throw new Error(Conference.mixins.addId.messages.triedToReplace + 'setId');
  }

  this.getId = function() {
    return id;
  }

  this.setId = function(idValue) {
    id = idValue;
  }
}
Conference.mixins.addId.messages = {
  triedToReplace: "감히.......?"
}