import { Conference } from "../../src/chapter11/Conference.js";
import "../../src/chapter11/WidgetSandbox.js";
import "../../src/chapter11/WidgetTools.js";
import "../../src/chapter11/AttendeeWebAPI.js";
import "../../src/chapter11/attendee.js";
import "../../src/chapter11/attendeeNamesWidget.js";

describe("Conference.Widgets.attendeeNamesWidget(sandbox)", () => {
  'use strict';

  let sandbox;
  beforeEach(() => {
    sandbox = {};
  })

  it('dom 도구를 사용할 수 없는 경우 에러를 던진다.', () => {
    expect(function shouldThrow() {
      Conference.Widgets.attendeeNamesWidget(sandbox)
    }).toThrowError(Conference.Widgets.messages.missingTool + 'dom');
  });

  it('attendeeNames 도구를 사용할 수 없는 경우 에러를 던진다.', () => {
    expect(function shouldThrow() {
      sandbox.dom = {};
      Conference.Widgets.attendeeNamesWidget(sandbox);
    }).toThrowError(Conference.Widgets.messages.missingTool + 'attendeeNames');
  })
})