import { Conference } from "../../src/chapter3/callback.js";

describe('Conference.checkInService', () => {
  let checkInService;
  let checkInRecorder;
  let nowAttendee;

  beforeEach(() => {
    checkInRecorder = Conference.checkInRecorder();
    spyOn(checkInRecorder, 'recordCheckIn');

    // checkInRecorder 주입하며, recordCheckIn 함수에 스파이를 심는다.
    checkInService = Conference.checkInService(checkInRecorder);

    nowAttendee = Conference.attendee('홍철', '노');
  })
  
  describe('checkInService.checkIn(attendee)', () => {
    it('참가자를 체크인 처리한 것으로 표시한다.', () => {
      checkInService.checkIn(nowAttendee);
      expect(nowAttendee.checkedIn).toBe(true);
    })

    it('체크인을 등록한다', () => {
      checkInService.checkIn(nowAttendee);
      expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(nowAttendee)
    })
  })
})