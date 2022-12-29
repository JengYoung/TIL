import { Conference } from "./Conference.js";
import { ReliableJavaScript } from "./ReliableJavaScript.js";

Conference.attendee = function(firstName, lastName) {
  'use strict';

  let attendeeId;
  let checkedIn = false;
  let first = firstName || 'None';
  let last = lastName || 'None';
  let checkInNumber;

  const newAttendee =  {
    // setId(id) {
    //   attendeeId = id;
    // },
    // getId() {
    //   return attendeeId;
    // },
    getFullName() {
      return `${first} ${last}`
    },
    isCheckIn() {
      return checkedIn;
    },
    checkIn() {
      checkedIn = true;
    },
    undoCheckIn() {
      checkedIn = false;
      checkInNumber = undefined;
    },
    setCheckInNumber(number) {
      checkInNumber = number;
    },
    getCheckInNumber() {
      return checkInNumber;
    },
  }


  // INFO: 재래식 믹스인 패턴 / 함수형 믹스인 패턴
  // ReliableJavaScript.extend(newAttendee, Conference.mixins.idMixin());
  Conference.mixins.addId.call(newAttendee);

  return newAttendee;
}