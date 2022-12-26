import { Conference } from "../../src/chapter11/Conference.js";
import "../../src/chapter11/WidgetSandbox.js";
import "../../src/chapter11/WidgetTools.js";
import "../../src/chapter11/AttendeeWebAPI.js";
import "../../src/chapter11/attendee.js";
import "../../src/chapter11/attendeeNamesWidget.js";

describe('Conference.WidgetSandbox', () => {
  'use strict';

  describe('생성자 함수', () => {
    let widgetFnSpy;

    beforeEach(() => {
      Conference.WidgetTools.tool1 = function(sandbox) {
        return {};
      };
      Conference.WidgetTools.tool2 = function(sandbox) {
        return {};
      };

      widgetFnSpy = jasmine.createSpy();
    });
    
    afterEach(() => {
      delete Conference.WidgetTools.tool1;
      delete Conference.WidgetTools.tool2;
    });

    it('new 키워드로 실행하지 않으면 예외를 던진다.', () => {
      expect(function shouldThrow() {
        const sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
    });

    describe('new WidgetSandbox(toolsArray, widgetModule)', () => {
      const tools = ['tool1', 'tool2']
      it('위젯 함수가 누락되면 예외를 던진다.', () => {
        [null, undefined, 1, "SomeString", false].forEach((val) => {
          expect(function shouldThrow() {
            const sandbox = new Conference.WidgetSandbox(tools,val);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustsBeProvided);
        })
      })

      it('sandbox를 인자로 위젯 함수를 실행한다.', () => {
        const widgetFn = jasmine.createSpy();
        const sandbox = new Conference.WidgetSandbox(tools, widgetFn);
        expect(widgetFn).toHaveBeenCalledWith(sandbox);
      })

      it('올바르지 않은 도구를 지정하면 예외를 던진다', () => {
        const badTool = '😈';
        expect(function shouldThrow() {
          const sandbox = new Conference.WidgetSandbox(['tool1', badTool], widgetFnSpy)
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool);
      })

      it('도구 모듈 함수를 sandbox에서 실행한다.', () => {
        spyOn(Conference.WidgetTools, 'tool1');
        spyOn(Conference.WidgetTools, 'tool2');

        const sandbox = new Conference.WidgetSandbox(['tool1', 'tool2'], widgetFnSpy);
        
        expect(Conference.WidgetTools.tool1).toHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).toHaveBeenCalledWith(sandbox);
      })
    })

    describe("new WidgetSandbox('tool1', ..., widgetModule)", () => {
      it('위젯 함수가 누락되면 예외를 던진다.', () => {
        [null, undefined, 1, "SomeString", false].forEach((notFn) => {
          expect(function shouldThrow() {
            const sandbox = new Conference.WidgetSandbox('tool1', 'tool2', notFn);
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustsBeProvided);
        })
      })
  
      it('sandbox를 인자로 위젯 함수를 실행한다.', () => {
        const widgetFn = jasmine.createSpy();
        const sandbox = new Conference.WidgetSandbox('tool1', 'tool2', widgetFn);
        expect(widgetFn).toHaveBeenCalledWith(sandbox);
      })

      it('올바르지 않은 도구를 지정하면 예외를 던진다', () => {
        const badTool = '😈';
        expect(function shouldThrow() {
          const sandbox = new Conference.WidgetSandbox('tool1', badTool, widgetFnSpy)
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool);
      })

      it('도구 모듈 함수를 sandbox에서 실행한다.', () => {
        spyOn(Conference.WidgetTools, 'tool1');
        spyOn(Conference.WidgetTools, 'tool2');

        const sandbox = new Conference.WidgetSandbox('tool1', 'tool2', widgetFnSpy);
        
        expect(Conference.WidgetTools.tool1).toHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).toHaveBeenCalledWith(sandbox);
      })
    })
  })
})

describe("Conference.WidgetTools.attendeeNames", () => {
  'use strict';

  let attendeeWebAPI;
  let sandbox;

  beforeEach(() => {
    attendeeWebAPI = Conference.attendeeWebAPI();

    spyOn(attendeeWebAPI, 'post');

    sandbox = {};
  });

  afterEach(() => {
    expect(attendeeWebAPI.post).not.toHaveBeenCalled();
  })

  it('주어진 sandbox 객체에 자신을 추가한다.', () => {
    Conference.WidgetTools.attendeeNames(sandbox, attendeeWebAPI);
    expect(sandbox.attendeeNames).not.toBeUndefined();
  })

  describe('attendeeNames.getAll()', () => {
    let attendees;
    let attendeeNames;

    beforeEach(() => {
      Conference.WidgetTools.attendeeNames(sandbox, attendeeWebAPI);

      attendees = [
        Conference.attendee("다미", "김"),
        Conference.attendee("이서", "조"),
        Conference.attendee("연수", "국")
      ];


      attendeeNames = [];

      attendees.forEach((attendee) => {
        attendeeNames.push(attendee.getFullName());
      })
    })

    it("참가자가 없을 경우 빈 배열로 귀결한다.", (done) => {
      spyOn(attendeeWebAPI, 'getAll').and.returnValue(
        new Promise((resolve, reject) => {
          resolve([])
        })
      )

      sandbox.attendeeNames.getAll().then(
        (names) => {
          expect(names).toEqual([]);
          done();
        }, 
        (reason) => {
          expect(reason).toBe(false);
          done();
        }
      )
    });

    it('참가자가 있을 경우 해당 이름으로 귀결한다.', (done) => {
      spyOn(attendeeWebAPI, 'getAll').and.returnValue(
        new Promise((resolve, reject) => {
          resolve(attendees);
        })
      );
  
      sandbox.attendeeNames.getAll().then(
        (names) => {
          expect(names).toEqual(attendeeNames);
          done();
        },
        (reason) => {
          console.log(reason)
          expect(reason).toBe(false);
          done();
        }
      )
    })

    it('어떤 사유로 인해 버려진다.', (done) => {
      const rejectionReason = 'resolved bcz of sth.';
  
      spyOn(attendeeWebAPI, 'getAll').and.returnValue(
        new Promise((resolve, reject) => {
          reject(rejectionReason);
        })
      )
  
      sandbox.attendeeNames.getAll().then(
        (names) => {
          expect('resolved').toBe(false);
          done();
        },
        (reason) => {
          expect(reason).toBe(rejectionReason);
          done();
        }
      )
    })
  });
})