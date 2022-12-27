import { Conference } from "./Conference.js";

Conference.presenterEvaluation = function() {
  'use strict';

  let presenter;

  return {
    setPresenter(presenterName) {
      presenter = presenterName;
      return this;
    },
    getPresenter() {
      return presenter;
    },
    setPresentation(presentationName) {
      return this;
    }
  }
}