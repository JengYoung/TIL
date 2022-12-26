import { Conference } from "./callback.js";

Conference.checkInRecorder = function() {
  "use strict";

  const messages = {
    mustBeCheckedIn: "참가자는 체크인이 된 것으로 표시되어야 한다.",
    httpFailure: "HTTP 요청 실패!"
  }

  return {
    getMessages() {
      return messages;
    },

    recordCheckIn(attendee) {

      return new Promise((resolve, reject) => {
        if (attendee.checkedIn) {
          const xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function onreadystatechange() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
              } else {
                reject(new Error(messages.httpFailure));
              }
            }
          };

          xhr.open("POST", "/checkin/" + 1234, true);
          xhr.send();
          
        } else {
          reject(new Error(messages.mustBeCheckedIn))
        }
      })
    }
  }
}