/**
 * @method: requestTransportation(transportDetails)
 * 참가자가 선택한 운수회사에 올바르게 요청을 보내고 해석/반환하여 교통편 예약이 제대로 이루어졌는지 집계자료를 낸다.
 */

export const Conference = {};

Conference.httpService = function() {
  'use strict';

  return {
    post : function post(url, data) {
      // data를 url로 전송한 뒤, 처리가 완료되면 귀결되는
      // 프라미스를 반환한다
    }
  };
};