import { Conference } from "./Conference.js";

// INFO: 1. (도구명이 담긴 배열, 위젯 함수)
// INFO: 2. (...여러 도구명을 쭉 나열, 위젯 함수)
Conference.WidgetSandbox = function() {
  'use strict';

  if(!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  let widgetFunction;
  let toolsToLoad = [];
  let argsArray;

  argsArray = Array.prototype.slice.call(arguments);
  widgetFunction = argsArray.pop();


  if (typeof widgetFunction !== 'function') {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  toolsToLoad = (arguments[0] instanceof Array) 
    ? argsArray[0] 
    : argsArray;

  toolsToLoad.forEach((toolName) => {
    if (!Conference.WidgetTools.hasOwnProperty(toolName)) {
      throw new Error(Conference.WidgetSandbox.messages.unknownTool + toolName);
    }

    Conference.WidgetTools[toolName](this);
  })


  const widget = widgetFunction(this);
}

Conference.WidgetTools = {};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 한다.",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목이다.",
  unknownTool: "알 수 없는 도구다."
}