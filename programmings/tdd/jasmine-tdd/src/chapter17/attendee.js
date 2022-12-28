import { Conference } from "./Conference.js";

Conference.attendee = function(firstName, lastName, registry) {
  'use strict';

  let attendeeId;
  let first = firstName ||'none';
  let last = lastName || 'none';

  let checkInNumber;

  let checkedIn = false;

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

  const ret = {
    setId(id) {
      attendeeId = id;
    },

    getId() {
      return attendeeId;;
    },

    getFullName() {
      return `${first} ${last}`
    },

    isCheckedIn() {
      return checkedIn;
    },

    checkIn() {
      checkedIn = true;
    },

    undoCheckIn() {
      checkedIn = false;
    },

    setCheckInNumber(number) {
      checkInNumber = number;
    },
    getCheckInNumber() {
      return checkInNumber;
    }
  }

  registry.assert(attendeePersonalInfo, ret);
  registry.assert(attendeeCheckInManangement, ret);

  return ret;
}
