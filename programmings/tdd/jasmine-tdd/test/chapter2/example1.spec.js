import ReservationSaver from "../../src/chapter2/saveReservation.js";
import createReservation from "../../src/chapter2/createReservation.js";

describe('createReservation', function() {
  let testFlight = null;
  let testPassenger = null;
  let testSaver = null;
  let testReservation = null;

  beforeEach(() => {
    testPassenger = {
      firstName: 'Jaeyoung',
      lastName: 'Hwang'
    };

     testFlight = {
      number: '221202',
      carrier: 'JengYoungFlight',
      destination: 'Seoul'
    };

    testSaver = new ReservationSaver();
    spyOn(testSaver, 'saveReservation');

    testReservation = createReservation(testPassenger, testFlight, testSaver)
  });

  afterEach(() => {
    testPassenger = null;
    testFlight = null;
    testSaver = null;
    testReservation = null;
  })

  it('주어진 passenger를 passengerInfo 프로퍼티에 할당한다', function() {
    // expect(testReservation.passengerInfo).toBe(testPassenger);
  });

  it('주어진 flight를 flightInfo 프로퍼티에 할당한다', function() {
    // expect(testReservation.flightInfo).toBe(testFlight);
  });

  it('예약 정보를 저장한다.', () => {
    expect(testSaver.saveReservation).toHaveBeenCalled();
  })
});