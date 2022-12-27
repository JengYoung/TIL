import { Conference } from "./Conference.js";

Conference.attendeeProfileService = function() {
  'use strict';

  return {
    getProfile(attendeeId) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function onreadystatechange() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(new Error(Conference.attendeeProfileService.messages.httpFailure))
            }
          }
        }
        xhr.open('GET', 'profile/' + attendeeId, true);
        xhr.send();
      })
    }
  }
}

Conference.attendeeProfileService.messages = {
  httpFailure: 'HTTP 요청 실패!'
}