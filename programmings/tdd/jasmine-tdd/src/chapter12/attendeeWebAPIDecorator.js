import { Conference } from "./Conference.js";

Conference.attendeeWebAPIDecorator = {};

Conference.attendeeWebAPIDecorator = function(baseWebAPI) {
  'use strict';

  const self = this;

  const pendingPosts = [];
  
  const messages = {
    postPending: '이 참가자에 대한 처리가 진행 중이다.'
  }

  function indexOfPostForSameAttendee(posts, attendee) {
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].isSamePersonAs(attendee)) {
        return i;
      }
    }

    return -1;
  }

  return {
    post(attendee) {
      if (indexOfPostForSameAttendee(pendingPosts, attendee) >= 0) {
        return Promise.reject(new Error(messages.postPending));
      }

      pendingPosts.push(attendee);
      
      return baseWebAPI.post(attendee).then(
        (attendeeWithId) => {
          /**
           * post가 ID를 채번한 attendee를 반환할 때 pendingPosts에 ID를 넣는다.
           * getAll 결과에 이미 레코드가 추가되었다면 ID를 세팅한 다음 받는 편이 더 좋기 때문이다.
           */

          const idx = pendingPosts.indexOf(attendee);

          if (idx >= 0) {
            pendingPosts[idx].setId(attendeeWithId.getId());
            pendingPosts.splice(idx, 1);
          }

          return attendeeWithId;
        },
        (reason) => {
          const idx = pendingPosts.indexOf(attendee);
          
          if (idx >= 0) {
            pendingPosts.splice(idx, 1);
          }

          return Promise.reject(reason);
        }
      );
    },
    
    getAll() {
      return baseWebAPI.getAll().then((records) => {
        pendingPosts.forEach((pending) => {
          let i = indexOfPostForSameAttendee(records, pending);
          if (i < 0) {
            records.push(pending);
          }
        })
        
        return records;
      })
    },
    getMessages() {
      return messages;
    }
  }
}