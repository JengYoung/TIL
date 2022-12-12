const TravelerService = (() => {
  const conferenceAirport = 'BOS';
  const maxArrival = new Date();
  const minDeparture = new Date();

  const cache = [];

  return {
    getSuggestedTicket: (homeAirport) => {
      let ticket;

      if (cache[homeAirport]) {
        return cache[homeAirport];
      }

      ticket = rawWebservice.getCheapestRoundTrip(
        homeAirport, conferenceAirport, maxArrival, minDeparture
      )

      cache[homeAirport] = ticket;
      
      return ticket;
    }
  }
})();

// 광고 정보를 가져온다.

// TravelerService.getSuggestedTicket(attendee.homeAirport);