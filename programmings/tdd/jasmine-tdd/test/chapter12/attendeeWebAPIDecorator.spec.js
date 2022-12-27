import { Conference } from "../../src/chapter12/Conference.js";
import "../../src/chapter12/attendee.js"
import "../../src/chapter12/attendeeWebAPIDecorator.js"
import "../../src/chapter12/fakeAttendeeWebAPI.js"

describe('attendeWebAPIDecorator', () => {
  'use strict';

  let decoratedWebAPI;
  let baseWebAPI;
  let underlyingFailure = 'function failed';

  let attendeeA;
  let attendeeB;


  beforeEach(function() {
    baseWebAPI = Conference.fakeAttendeeWebAPI();
    decoratedWebAPI = Conference.attendeeWebAPIDecorator(baseWebAPI);

    attendeeA = Conference.attendee('제이','이');
    attendeeB = Conference.attendee('솔이','이');
  });

  function getAllWithSuccessExpectation(done, expectation) {
    decoratedWebAPI.getAll().then(
      (attendees) => {
        // expectation(attendees);
        done();
      },
      (error) => {
        expect('getAll() failed: ').toBe(false);
        done();
      }
    )
  }
  describe('post(attendee)', () => {
    describe('원 post가 성공할 경우', () => { 
      it('ID가 채번된 attendee로 resolve 되는 프라미스를 반환한다', (done) => {
        decoratedWebAPI.post(attendeeA).then(
          (attendee) => {
            expect(attendee.getFullName()).toBe(attendeeA.getFullName())
            expect(attendee.getId()).not.toBeUndefined();
            done();
          },
          () => {
            expect('failed').toBe(false);
            done();
          }
        )
      });
  
      it('getAll을 즉시 실행하면 ID가 채번되지 않은 레코드가 포함된다.', (done) => {
        decoratedWebAPI.post(attendeeA);
  
        // INFO: post가 resolved 되기를 기다리지 않고 getAll을 바로 실행한다.
        getAllWithSuccessExpectation(done, (attendees) => {
          expect(attendees.length).toBe(1);
          expect(attendees[0].getId()).toBeUndefined();
        })
      });
  
      it('getAll을 지연시키면 ID가 채번된 레코드가 포함된다.', (done) => {
        // INFO: post가 resolved 된 후 getAll을 실행한다.
  
        decoratedWebAPI.post(attendeeA).then(() => {
          getAllWithSuccessExpectation(done, (attendees) => {
            expect(attendees.length).toBe(1);
            expect(attendees[0].getId()).not.toBeUndefined();
          })
        })
      });
  
      it('getAll에 이미 추가된 레코드의 ID를 채운다.', (done) => {
        let recordsFromGetAll;
        let promiseFromPostA;
  
        // INFO: post를 실행하고 결과를 기다리지 않는다.
        promiseFromPostA = decoratedWebAPI.post(attendeeA);
        
        // INFO: post를 실행하고 그 결과를 포착한다.
        decoratedWebAPI.getAll().then((attendees) => {
          recordsFromGetAll = attendees;
          expect(recordsFromGetAll[0].getId()).toBeUndefined();
        });
  
        /**
         * 이제 post가 최종 귀결되기를 기다린다.
         * post의 타임아웃은 현재 getAll의 타임아웃보다 더 짧은 상황이다.
         * post가 귀결됨녀 getAll()의 pending records에서 attendeeId가 나와야 한다. 
         */
        promiseFromPostA.then(() => {
          expect(recordsFromGetAll[0].getId()).not.toBeUndefined();
          done()
        })
      })
    });
    
    describe("원 post가 실패할 경우", () => {
      beforeEach(() => {
        spyOn(baseWebAPI, 'post').and.returnValue(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(underlyingFailure);
            }, 5)
          })
        )
      });
      
      it('원사유로 인해 버려진 프라미스를 반환한다', function(done) {
        decoratedWebAPI.post(attendeeA).then(
          () => {
            expect('원사유로 인해 버려진 프라미스를 반환한다').toBe(false);
            done();
          },
          (reason) => {
            expect(reason).toBe(underlyingFailure);
            done();
          });
      });

      it('여전히 getAll을 즉시 실행하면 ID가 채번되지 않은 레코드가 포함된다.', (done) => {
        decoratedWebAPI.post(attendeeA).catch(function () {
          // INFO: 여기서 rejected Promise를 받아버린다.
        });

        getAllWithSuccessExpectation(done, (attendees) => {
          expect(attendees.length).toBe(1);
          expect(attendees[0].getId()).toBeUndefined();
        })
      });

      it('getAll을 지연시켜 레코드를 배제한다.', (done) => {
        decoratedWebAPI.post(attendeeA).then(
          () => {
            expect('success').toBe(false);
            done();
          },
          (error) => {
            getAllWithSuccessExpectation(done, (attendees) => {
              expect(attendees.length).toBe(0)
            })
          }
        )
      })
    })

    describe('전송한 참가자에 대해서만 호출할 때', () => {
      it("버림 프라미스를 반환한다.", (done) => {
        decoratedWebAPI.post(attendeeA);
        decoratedWebAPI.post(attendeeA).then(
          () => {
            expect('success').toBe(false);
            done();
          },
          (error) => {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe(decoratedWebAPI.getMessages().postPending);
            done();
          }
        )
      })
    });
  })

  describe('getAll()', () => {
    describe('원 getAll이 성공할 경우', () => {
      it('미결 상태인 레코드가 하나도 없다면 처리된 전체 레코드에 대한 프라미스를 반환한다.', (done) => {
        spyOn(baseWebAPI, 'getAll').and.returnValue(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([attendeeA, attendeeB])
            }, 1)
          })
        )

        getAllWithSuccessExpectation(done, (attendees) => {
          expect(attendees.length).toBe(2);
        });
      }),

      it('처리된 전체 레코드 + 미결 상태인 전체 레코드를 반환한다.', (done) => {
        decoratedWebAPI.post(attendeeA).then(() => {
          decoratedWebAPI.post(attendeeB);

          getAllWithSuccessExpectation(done, (attendees) => {
            expect(attendees.length).toBe(2);
            expect(attendees[0].getId()).not.toBeUndefined();
            expect(attendees[1].getId()).toBeUndefined()
          })
        })
      })
    })
    
    describe('원 getAll이 실패할 경우', () => {
      it('원 reject Promise를 반환한다.', (done) => {
        spyOn(baseWebAPI, 'getAll').and.returnValue(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(underlyingFailure);
            }, 1)
          })
        )

        decoratedWebAPI.getAll().then(
          () => {
            expect('Underlying getAll succeeded').toBe(false);
            done();
          },
          (reason) => {
            expect(reason).toBe(underlyingFailure);
            done();
          }
        )
      })
    })
  })
})