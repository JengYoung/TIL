export default function createReservation(passenger, flight, saver) {
  const reservation = {
    passengerInfo: passenger,
    flightInfo: flight
  };

  saver.saveReservation(reservation);

  return reservation;
}
