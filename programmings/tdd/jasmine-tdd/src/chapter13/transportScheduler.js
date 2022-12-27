import { Conference } from "./Conference.js";

Conference.transportScheduler = function(auditService, transportCompanyFactory) {
  'use strict';

  if (!auditService) {
    throw new Error(Conference.transportScheduler.messages.noAuditService);
  }

  if (!transportCompanyFactory) {
    throw new Error(Conference.transportScheduler.messages.noCompanyFactory);
  }

  return {
    scheduleTransportation(transportDetails) {
      if (!transportDetails) {
        throw new Error(Conference.transportScheduler.messages.noDetails);
      }

      const company = transportCompanyFactory.create(transportDetails);

      return company.schedulePickup(transportDetails)
        .then((confirmation) => {
          auditService.logReservation(transportDetails, confirmation);
          return confirmation;
        })
    }
  }
}

Conference.transportScheduler.messages = {
  noAuditService: "집계 서비스 인스턴스는 필수다.",
  noCompanyFactory: "운수회사 팩토리 인스턴스는 필수다.",
  noDetails: "transportDetails 인스턴스는 필수다."
}