import { Conference } from "../../src/chapter3/callback.js"


describe('Conference.attendeeCollection', function() {
  describe('contains(attendee)', function() {
    // contains test
    it('test', () => {

    })
  })
  describe('contains(attendee)1', function() {
    // contains test
    it('test', () => {

    })

  })
  describe('contains(attendee)', function() {
    // contains test
    it('test', () => {

    })
  })
  describe('iterate(callback)', function() {
    let collection;
    let callbackSpy;

    function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach((attendee) => {
        collection.add(attendee);
      })
    }

    function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
      // 각 원소마다 한 번씩 스파이가 호출됐는지 확인한다.

      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);
      
      // 각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다.
      const allCalls = callbackSpy.calls.all();
      for (let i = 0; i < allCalls.length; i += 1) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(() => {
      collection = Conference.attendeeCollection();
      callbackSpy = jasmine.createSpy();
    })

    it('빈 컬렉션에서는 콜백을 실행하지 않는다.', () => {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    })

    it('원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다.', () => {
      const attendees = [
        Conference.attendee('재영', '황')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExecutedForEachAttendee(attendees);
    })

    it('컬렉션 원소마다 한 번씩 콜백을 실행한다.', () => {
      const attendees = [
        Conference.attendee('재영', '황'),
        Conference.attendee('선미', '황'),
        Conference.attendee('선영', '황')
      ];
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExecutedForEachAttendee(attendees);
    })
  })
})