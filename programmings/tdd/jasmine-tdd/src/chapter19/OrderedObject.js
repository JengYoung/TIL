import { Conference } from "./Conference.js";

Conference.OrderedObject = function() {
  'use strict';

  let self;
  const propertyIterationCounts = {};

  this.incrementIterationCount = function(prop) {
    if (!propertyIterationCounts[prop]) {
      propertyIterationCounts[prop] = 1;
    } else {
      ++propertyIterationCounts[prop];
    }
  };

  this.getIterationCount = function(prop) {
    return propertyIterationCounts[prop];
  }
};

Conference.OrderedObject.prototype.forEachKey = function(callbackFn) {
  'use strict';

  let propName;
  const orderedKeys = Object.keys(this).sort();

  for (let i = 0; i < orderedKeys.length; i += 1) {
    propName = orderedKeys[i];
    callbackFn.call(this, propName, this[propName]);
  }
}

Conference.OrderedObject.prototype.trackedForEachKey = function(callbackFn) {
  'use strict';
  const that = this;

  function callbackAndTrack(prop, value) {
    callbackFn.call(that, prop, value);
    that.incrementIterationCount(prop);
  }

  this.forEachKey(callbackAndTrack);
}