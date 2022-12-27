import { Conference } from "../../src/chapter13/Conference.js";
import "../../src/chapter13/transportCompanyFactory.js";
import "../../src/chapter13/transportScheduler.js";
import "../../src/chapter13/transportCompanyAuditService.js";

describe('Conference.transportScheduler', () => {
  'use strict';

  describe('모듈 함수', () => {
    it("집계 서비스 인자가 누락되면 예외를 던진다.", () => {
      expect(function shouldThrow() {
        const scheduler = Conference.transportScheduler(null, {});
      }).toThrowError(Conference.transportScheduler.messages.noAuditService);
    });

    it('회사 팩토리 인자가 누락되면 예외를 던진다.', () => {
      expect(function shouldThrow() {
        const scheduler = Conference.transportScheduler({}, null);
      }).toThrowError(Conference.transportScheduler.messages.noCompanyFactory);
    })
  });

  describe("scheduleTransportation(transportDetails)", () => {
    let scheduler;
    let auditService;
    let companyFactory;
    let testDetails;
    let fakeCompany;
    let confirmationNumber;

    beforeEach(() => {
      /**
       * INFO: transportScheduler 인스턴스에 주읩할 의존성 인스턴스를 생성한다.
       * 참조값을 보관해두어야 테스트할 때 spy로 메서드를 감시 가능하다.
       */
      auditService = Conference.transportCompanyAuditService();
      companyFactory = Conference.transportCompanyFactory();

      // 테스트할 인스턴스
      scheduler = Conference.transportScheduler(auditService, companyFactory);
      
      // companyFactory.create 자체가 가짜이니, testDetails도 진짜 객체의 인스턴스일 필요가 없다.
      testDetails = {};

      confirmationNumber = 'ABC-123-XYZ';

      /**
       * schedulePickup 함수를 구현한 가짜 운송 모듈.
       * 반환된 프라미스는 기본적으로 confirmationNumber로 resolve된다.
       * reject Promise의 경우 schedulePickup을 감시한다.
       */
      fakeCompany = {
        schedulePickup(transfortDetails) {
          return new Promise((resolve, reject) => {
            resolve(confirmationNumber);
          })
        }
      }
    });

    it('transportDetails 인자가 누락되면 예외를 던진다.', () => {
      expect(function shouldThrow() {
        scheduler.scheduleTransportation();
      }).toThrowError(Conference.transportScheduler.messages.noDetails);
    })

    it('회사 팩토리가 던진 예외를 무시하지 않는다.', () => {
      const companyFactoryError = '운수회사 팩토리가 던진 예외입니다.';
      spyOn(companyFactory, 'create').and.throwError(companyFactoryError);
      expect(function shouldThrow() {
        scheduler.scheduleTransportation(testDetails);
      }).toThrowError(companyFactoryError);
    });

    it('회사 팩토리에서 회사 모듈을 가져온다.', () => {
      spyOn(companyFactory, 'create').and.returnValue(fakeCompany);

      scheduler.scheduleTransportation(testDetails);

      expect(companyFactory.create).toHaveBeenCalledWith(testDetails);
    });

    it('회사의 schedulePickup 함수를 실행한다.', () => {
      spyOn(companyFactory, 'create').and.returnValue(fakeCompany);

      /**
       * fakeCompany는 resolve Promise를 반환한다.
       * 그냥 호출 후 지나친다. (call through)
       */

      spyOn(fakeCompany, "schedulePickup").and.callThrough();

      scheduler.scheduleTransportation(testDetails);

      expect(fakeCompany.schedulePickup).toHaveBeenCalledWith(testDetails);
    });

    describe('스케줄링이 성공하면', () => {
      beforeEach(() => {
        spyOn(companyFactory, 'create').and.returnValue(fakeCompany);
      })

      it('반환된 확인 번호로 귀결된다.', (done) => {
        scheduler.scheduleTransportation(testDetails)
          .then(
            (confirmation) => {
              expect(confirmation) .toEqual(confirmationNumber);
              done()
            },
            () => {
              expect('반환된 확인 번호로 귀결된다.').toBe(false)
              done();
            }
          )
      });

      it('집계 서비스로 로깅한다.', (done) => {
        spyOn(auditService, "logReservation");

        scheduler.scheduleTransportation(testDetails)
          .then(
            (confirmation) => {
              expect(auditService.logReservation)
                .toHaveBeenCalledWith(testDetails, confirmationNumber);
              done();
            },
            () => {
              expect('집계 서비스로 로깅한다.').toBe(false)
              done();
            }
          )
      });
    });

    describe('스케줄링이 실패하면', () => {
      let rejectionReason;

      beforeEach(() => {
        spyOn(companyFactory, 'create').and.returnValue(fakeCompany);

        rejectionReason = '그냥 버린다!';

        spyOn(fakeCompany, 'schedulePickup')
          .and.returnValue(new Promise((resolve, reject) => reject(rejectionReason)));
      });

      it('reject Promise가 호출부로 흘러간다.', (done) => {
        scheduler.scheduleTransportation(testDetails)
          .then(
            () => {
              expect('reject Promise가 호출부로 흘러간다.').toBe(false)
              done();
            },
            (reason) => {
              expect(reason).toBe(rejectionReason)
              done();
            }
          )
      });

      it('집계 서비스로 아무것도 로깅하지 않는다.', (done) => {
        spyOn(auditService, 'logReservation');

        scheduler.scheduleTransportation(testDetails)
          .then(
            () => {
              expect('집계 서비스로 아무것도 로깅하지 않는다.').toBe(false)
              done();
            },
            (reason) => {
              expect(auditService.logReservation).not.toHaveBeenCalled();
              done();
            },
          )
      })
    });

  })
})