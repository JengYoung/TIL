import { Conference } from "../../src/chapter6/callback.js";

describe('Conference.checkInService', function() {
  'use strict';

  let checkInService;
  let checkInRecorder;
  let attendee;

  beforeEach(() => {
    checkInRecorder =  Conference.checkInRecorder();
    checkInService = Conference.checkInService(checkInRecorder);
    attendee = Conference.attendee('재영', '황');
  })

  describe('checkInService.checkIn(attendee)', function() {
    describe('checkInRecorder 성공 시', function() {
      const checkInNumber = 1234;

      beforeEach(() => {
        spyOn(checkInRecorder, 'recordCheckIn').and.callFake(() => {
          return Promise.resolve(checkInNumber);
        })
      })

      it('참가자를 체크한 것으로 표시한다.', () => {
        checkInService.checkIn(attendee);
        expect(attendee.checkedIn).toBe(true);
      })

      it('체크인을 등록한다.', () => {
        checkInService.checkIn(attendee);
        expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
      })

      /**  
       * NOTE: done은 비동기 코드 테스팅을 지원하는 콜백이다. 
       * 이를 넣지 않으면 비동기 코드가 다 끝나기 전에 테스트를 종료해버리므로 성공할 테스트도 제때 결과에 반영하지 못한다.
       */
      it('참가자의 checkInNumber를 지정한다.', (done) => {
        checkInService.checkIn(attendee).then(
          function onPromiseResolved() {
            expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            done();
          },
          function onPromiseRejected() {
            expect('이 실패 분기 코드가 실행되었다.').toBe(false);
          }
        )
      })
    })
    describe('checkInRecorder 실패 시 ', () => {
      const recorderError = '체크인 등록 실패!';
      
      beforeEach(() => {
        spyOn(checkInRecorder, 'recordCheckIn').and.returnValue(Promise.reject(new Error(recorderError)));
        spyOn(attendee, 'undoCheckIn');
      })

      it("기대 사유와 함께 reject 프라미스를 반환한다.", (done) => {
        checkInService.checkIn(attendee).then(
          function onPromiseResolved() {
            expect('이 성공 함수가 실행된다.').toBe(false);
            done();
          },
          function onPromiseRejected(reason) {
            expect(reason.message).toBe(recorderError);
            done();
          }
        )
      })
    })
  })
})