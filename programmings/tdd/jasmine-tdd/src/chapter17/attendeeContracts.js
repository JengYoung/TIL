import Aop from "../chapter2/AOP.js";
import { Conference } from "./Conference.js";

// INFO: 애스팩트를 사용하여 규약을 단언하는 역할이다.
Conference.attendeeContracts = function(registry) {
  'use strict';

  const personalInfo = 'Conference.attendee.personalInfo';
  const checkInManangement = 'Conference.attendee.checkInManagement';


  return {
    getContracts() {
      function fulfillsPersonalInfo(att) {
        return typeof att.setId === 'function' &&
              typeof att.getId === 'function' &&
              typeof att.getFullName === 'function'
      }

      function fulfillsCheckInManagement(att) {
        return typeof att.getId ==='function' &&
              typeof att.isCheckedIn === 'function' &&
              typeof att.checkIn === 'function' &&
              typeof att.undoCheckIn === 'function' &&
              typeof att.setCheckInNumber === 'function' &&
              typeof att.getCheckInNumber === 'function'
      }

      return [
        { name: personalInfo, evaluator: fulfillsPersonalInfo },
        { name: checkInManangement, evaluator: fulfillsCheckInManagement },
      ]
    },
    attachValidators(registry) {
      const funcName = 'attendee';
      registry.attachArgumentsValidator(
        funcName, 
        Conference, 
        [
          'undefined',
          'string',
          'string',
          'string'
        ]
      )

      registry.attachReturnValidator(funcName, Conference, personalInfo);
      registry.attachReturnValidator(funcName, Conference, checkInManangement);

      Aop.around(
        funcName,
        function attachAspectsToAttendeeObjectLiteral(targetInfo) {
          const instance = Aop.next(targetInfo);

          registry.attachArgumentsValidator('setId', instance, 'undefined');
          registry.attachReturnsValidator('setId', instance, 'nonNegativeInteger');
          registry.attachReturnsValidator('getId', instance, 'nonNegativeInteger');
          registry.attachReturnsValidator('getFullName', instance, 'string');
          registry.attachReturnsValidator('isCheckedIn', instance, 'boolean');
          registry.attachReturnsValidator('checkIn', instance, 'undefined');
          registry.attachReturnsValidator('undoCheckIn', instance, 'undefined');
          registry.attachArgumentsValidator('setCheckInNumber', instance, 'nonNegativeInteger');
          registry.attachArgumentsValidator('setCheckInNumber', instance, 'undefined');
          registry.attachArgumentsValidator('getCheckInNumber', instance, 'nonNegativeInteger');

          return instance;
        },
        Conference
      )
    }
  }
}