import { Conference } from "./Conference.js";

Conference.fakeAttendeeWebAPI = function() {
  'use strict';

  const attendees = [];

  return {
    // INFO: 서버에 전송하는 척 한다.

    post(attendee) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const copyOffAttendee = attendee.copy();
          copyOffAttendee.setId(attendees.length + 1);

          attendees.push(copyOffAttendee);
          resolve(copyOffAttendee);
        }, 5)
      })
    },

    getAll() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const copies = [];
          attendees.forEach(attendee => {
            copies.push(attendee.copy());
          })
          resolve(copies);
        }, 1)
      })
    }
  }
}