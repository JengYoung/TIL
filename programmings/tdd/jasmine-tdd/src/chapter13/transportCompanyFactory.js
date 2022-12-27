import { Conference } from "./Conference.js";

Conference.transportCompanyFactory = function() {
  'use strict';

  return {
    create(transportDetails) {
      /**
       * INFO: trasportDetails를 보고 어떤 운수회사 모듈을 생성/반환할지를 결정한다.
       */
    }
  }
}