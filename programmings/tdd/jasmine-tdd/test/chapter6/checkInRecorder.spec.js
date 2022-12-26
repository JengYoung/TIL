import { Conference } from "../../src/chapter6/callback.js";

describe('Conference.checkInRecorder', () => {
  'use strict';

  let attendee;
  let checkInRecorder;

  beforeEach(() => {
    attendee = Conference.attendee('아무개', '김');
    checkInRecorder = Conference.checkInRecorder();

    // INFO: 재스민 XMLHttpRequest 모의 라이브러리 설치
    jasmine.Ajax.install();
  })

  afterEach(() => {
    // INFO: 다 끝난 후, 원래 XMLHttpRequest로 돌려놓음.
    jasmine.Ajax.uninstall();
  })

  describe('recordCheckIn(attendee)', () => {
    // it('체크인 되면 checkInNumber로 resolve promise를 반환한다.', (done) => {
    //   attendee.checkIn();

    //   checkInRecorder.recordCheckIn(attendee).then(
    //     function onPromiseResolved(actualCheckInNumber) {
    //       expect(typeof actualCheckInNumber).toBe('number');
    //       done()
    //     },
    //     function onPromiseRejected() {
    //       expect('Promise is rejected').toBe(false);
    //       done();
    //     }
    //   )
    // })

    it('참가자가 체크인 되지 않으면 에러와 reject promise를 반환한다.', (done) => {
      checkInRecorder.recordCheckIn(attendee).then(
        function onPromiseResolved() {
          expect('Promise is resolved.').toBe(false);

          done()
        },
        function onPromiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message)
            .toBe(checkInRecorder.getMessages().mustBeCheckedIn);

          done();
        }
      )
    })

    it('HTTP 요청이 성공하여 참가자가 체크인 되면 checkInNumber로 resolve promise를 반환한다.', (done) => {
      const expectedCheckInNumber = 1234;
      attendee.checkIn();

      
      checkInRecorder.recordCheckIn(attendee).then(
        function onPromiseResolved(actualCheckInNumber) {
          expect(actualCheckInNumber).toBe(expectedCheckInNumber);
          done();
        },
        function onPromiseRejected() {
          expect('Promise is rejected').toBe(false);
          done();
        }
      )
        
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/checkin/' + 1234);

      request.respondWith({
        "status": 200,
        "responseText": expectedCheckInNumber
      });
    })

    it('HTTP 요청이 실패하여 참가자가 체크인 되지 않으면 에러와 reject promise를 반환한다.', (done) => {
      attendee.checkIn();

      checkInRecorder.recordCheckIn(attendee).then(
        function onPromiseResolved(actualCheckInNumber) {
          expect('Promise is resolved.').toBe(false);
          done();
        },
        function onPromiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message)
            .toBe(checkInRecorder.getMessages().httpFailure);
          
          done();
        }
      )
      const request = jasmine.Ajax.requests.mostRecent();
      
      expect(request.url).toBe('/checkin/' + 1234);
      
      request.respondWith({
        "status": 404,
        "responseText": "이래서 에러가 남..."
      });
    })
  })
})
