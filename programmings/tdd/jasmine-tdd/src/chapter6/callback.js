export const Conference = {};

Conference.attendee = function(firstname, lastname) {
  let checkedIn = false;
  let checkInNumber;
  let attendeeId;
  const first = firstname || 'None';
  const last = lastname || 'None';

  return {
    setId(id) {
      attendeeId = id;
    },
    getId() {
      return attendeeId;
    },
    get fullName() {
      return `${first} ${last}`
    },
    get checkedIn() {
      return checkedIn
    },
    checkIn() {
      checkedIn = true
    },
    getCheckInNumber() {
      return checkInNumber;
    },
    setCheckInNumber(number) {
      checkInNumber = number;
    },
    undoCheckIn() {
      checkedIn = false;
      checkInNumber = undefined;
    },
  }
}

Conference.attendeeCollection = function() {
  const attendees = [];

  return {
    contains: function(attendee) {
      return attendees.indexOf(attendee) > -1;
    },
    add: function(attendee) {
      if (!this.contains(attendee)) {
        attendees.push(attendee)
      }
    },
    remove: function(attendee) {
      if (this.contains(attendee)) {
        attendees.splice(attendees.indexOf(attendee), 1);
      }
    },
    get count() {
      return attendees.length
    },
    iterate: function(callback) {
      // attendee의 각 attendee에 대해 콜백을 실행한다.
      attendees.forEach(callback)
    }
  }
}

Conference.checkInService = function(checkInRecorder) {
  'use strict';

  const recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      return new Promise((resolve, reject) => {
        attendee.checkIn();

        recorder.recordCheckIn(attendee).then(
          function onRecordCheckInSucceded(checkInNumber) {
            attendee.setCheckInNumber(checkInNumber);
            resolve(checkInNumber);
          },
          function onRecordCheckInFailed(reason) {
            attendee.undoCheckIn();
            reject(reason);
          }
        )
      })
    }
  }
}

// Conference.checkInRecorder = function() {
//   "use strict";

//   return {
//     recordCheckIn(attendee) {
//       // 외부 서비스를 통해 체크인 등록한다
//     }
//   };
// };

Conference.checkedInAttendeeCounter = function() {
  let checkedInAttendees = 0;
  const self = {
    increment() {
      checkedInAttendees++;
    },
    get count() {
      return checkedInAttendees;
    },

    countIfCheckedIn: function(attendee) {
      if (attendee.checkedIn) {
        self.increment();
      }
    }
  }
  
  return self;
}