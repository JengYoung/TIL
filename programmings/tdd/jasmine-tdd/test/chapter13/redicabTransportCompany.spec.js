import { Conference } from "../../src/chapter13/Conference.js";
import "../../src/chapter13/transportCompanyFactory.js";
import "../../src/chapter13/transportScheduler.js";
import "../../src/chapter13/transportCompanyAuditService.js";
import "../../src/chapter13/redicabTransportCompany.js";

describe('redicabTransportCompany', () => {
  'use strict';

  let httpService;
  let company;
  let details;
  let expectedData;
  let testConfirmation;

  beforeEach(() => {
    httpService = Conference.httpService();

    company = Conference.redicabTransportCompany(httpService);

    details = {
      transportCompany: 'Redicab',
      passengerName: '황재영',
      departureTime: '7:30 PM'
    };

    expectedData = {
      passenger: details.passengerName,
      pickUp: 'Google',
      pickUpTime: details.departureTime,
      dropOff: 'Airport',
      rateCode: "JavaScriptConference"
    };

    testConfirmation = {
      confirmationCode: 'AAA-BBB-CCC',
      anticipatedCharge: 100000000
    };
  })

  describe('scehdulePickup(transportDetails)', () => {
    it("기대 데이터를 올바른 URL로 전송한다.", () => {
      spyOn(httpService, 'post')
        .and.callFake((url, data) => {
          expect(data).toEqual(expectedData);
          expect(url).toEqual(company.getSchedulePickupUrl());

          return new Promise((resolve, reject) => {
            resolve(testConfirmation);
          })
        });

      company.schedulePickup(details)
    })
  })

  it('확인 코드로 귀결된다.', (done) => {
    spyOn(httpService, 'post')
      .and.returnValue(new Promise((resolve, reject) => {
        resolve(testConfirmation)
      })
    );

    company.schedulePickup(details).then(
      (confirmation) => {
        expect(confirmation).toEqual(testConfirmation.confirmationCode);
        done();
      },
      (reason) => {
        expect('확인 코드로 귀결된다.').toBe(false);
        done();
      }
    )
  })
})