import { Conference } from "./Conference.js";

Conference.Widgets = Conference.Widgets || {};
Conference.Widgets.attendeeNamesWidget = function(sandbox) {
  'use strict';

  if (!sandbox.dom) {
    throw new Error(Conference.Widgets.messages.missingTool + 'dom');
  }

  if (!sandbox.attendeeNames) {
    throw new Error(Conference.Widgets.messages.missingTool + 'attendeeNames');
  }

  sandbox.attendeeNames.getAll().then(
    (names) => {
      // INFO: sandbox.dom으로 이름 목록을 표시한다.
    },
    (reason) => {
      // INFO: sandbox.dom으로 위젯 대신 에러 메시지를 나타낸다.
    }
  )
};

Conference.Widgets.messages = {
  missingTool: "누락된 도구"
}