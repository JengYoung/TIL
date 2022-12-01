import createReservation from "../src/chapter2/createReservation.js";

describe('createReservation', function() {
  let testFlight = null;
  let testPassenger = null;

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
  });

  afterEach(() => {
    testPassenger = null;
    testFlight = null;
  })

  it('주어진 passenger를 passengerInfo 프로퍼티에 할당한다', function() {
    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.passengerInfo).toBe(testPassenger);
  });

  it('주어진 flight를 flightInfo 프로퍼티에 할당한다', function() {
    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.flightInfo).toBe(testFlight);
  });
});