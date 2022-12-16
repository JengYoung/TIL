import { Conference } from "../../src/chapter3/callback.js";

describe('Conference.checkedInAttendeeCounter', () => {
  let counter;

  beforeEach(() => {
    counter = Conference.checkedInAttendeeCounter();
    console.log(counter)
  })

  describe('increment()', () => {
    // increment
    it(() => {})
  })
  describe('getCount()', () => {
    // getCount
    it(() => {})
  })
  describe('countIfCheckedIn(attendee)', () => {
    let attendee;

    beforeEach(() => {
      attendee = Conference.attendee('화숙', '김');
    })

    it('참가자가 체크인하지 않으면 인원수를 세지 않는다', () => {
      counter.countIfCheckedIn(attendee);
      expect(counter.count).toBe(0);
    })

    it('참가자가 체크인하면 인원수를 센다', () => {
      attendee.checkIn();
      counter.countIfCheckedIn(attendee);
      expect(counter.count).toBe(1);
    })

    it('this를 잘못 바인딩하면 연산되면 오류가 난다.', () => {
      attendee.checkIn();
      counter.countIfCheckedIn.call({}, attendee);
      expect(counter.count).toBe(1)
    })
  })
})