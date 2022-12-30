import Aop from "./Aop.js";
import { Conference } from "./index.js";

export function recentRegistrationsServiceContracts() {
  'use strict';

  return {
    getContracts: function getContracts() {
      return [];
    },

    attachValidators: function attachValidators(registry) {
      Aop.around('recentRegistrationsService',
      function attachAspects(targetInfo) {
        var instance = Aop.next(targetInfo);

        registry.attachArgumentsValidator(
          'addObserver', instance, ['observer']);

        return instance;
      }, Conference);
    }
  };
};