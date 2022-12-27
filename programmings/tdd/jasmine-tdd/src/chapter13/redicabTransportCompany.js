import { Conference } from "./Conference.js";

Conference.redicabTransportCompany = (httpService) => {
  'use strict';

  const schedulePickupUrl = 'http://redicab.com/scehdulepcikup';

  return {
    schedulePickup(transportDetails) {
      const details = {
        passenger: transportDetails.passengerName,
        pickUp: 'Google',
        pickUpTime: transportDetails.departureTime,
        dropOff: 'Airport',
        rateCode: 'JavaScriptConference'
      };

      return httpService.post(schedulePickupUrl, details)
        .then((confirmation) => {
          return confirmation.confirmationCode
        })
    },

    getSchedulePickupUrl() {
      return schedulePickupUrl;
    }
  }
}