import { Conference } from "./Conference.js";

// INFO: 애스팩트를 사용하여 규약을 단언하는 역할이다.
Conference.attendeeContracts = function(registry) {
  'use strict';

  const attendeePersonalInfo = 'Conference.attendee.personalInfo';
  const attendeeCheckInManangement = 'Conference.attendee.checkInManagement';

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

  registry.define(attendeePersonalInfo, fulfillsPersonalInfo);
  registry.define(attendeeCheckInManangement, fulfillsCheckInManagement);

  registry.attatchReturnValidator('attendee', Conference, attendeePersonalInfo);
  registry.attatchReturnValidator('attendee', Conference, attendeeCheckInManangement);
}