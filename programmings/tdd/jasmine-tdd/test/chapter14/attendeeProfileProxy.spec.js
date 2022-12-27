import { Conference } from "../../src/chapter14/Conference.js";
import  "../../src/chapter14/attendeeProfileProxy.js"
import  "../../src/chapter14/attendeeProfileService.js"

describe('attendeeProfileProxy(attendees, profileService, prefetchLimit)', () => {
  'use strict';

  const proxy = Conference.attendeeProfileProxy;
  const profileService = Conference.attendeeProfileService();

  const attendees = [
    { attendeeId: 10, profileViews: '3' },
    { attendeeId: 11, profileViews: '0' },
    { attendeeId: 12 },
    { attendeeId: 13, profileViews: '3' },
    { attendeeId: 14, profileViews: '10' },
    { attendeeId: 15, profileViews: '2' },
    { attendeeId: 16, profileViews: '1' }
  ];

  let spyOnProfileService;

  function makeServiceReturn(attendeeId) {
    return `이 문자열이 ID가 ${attendeeId}인 참가자에 대한 서비스의 실제 반환값이라고 가정한다.`
  }

  beforeEach(() => {
    spyOnProfileService = spyOn(profileService, 'getProfile')
      .and.callFake(makeServiceReturn);
  });

  describe('초기화', () => {
    it ('prefetchLimit이 양수가 아니면 프로필을 전혀 선취하지 않는다.', () => {
      const notPositiveNumbers = [ -1, 0, undefined, 'abc', function() {} ];
      notPositiveNumbers.forEach((prefetchLimit) => {
        proxy(attendees, profileService, prefetchLimit)
      });

      expect(spyOnProfileService.calls.count()).toBe(0);
    });

    it('가장 인기 있는 프로필부터 "prefetchLimit" 개 만큼 선취한다', () => {
      const prefetchLimit = 3;
      proxy(attendees, profileService, prefetchLimit);

      expect(spyOnProfileService.calls.count()).toBe(prefetchLimit);

      expect(spyOnProfileService).toHaveBeenCalledWith(14);
      expect(spyOnProfileService).toHaveBeenCalledWith(10);
      expect(spyOnProfileService).toHaveBeenCalledWith(13);
    })
  });

  describe('getProfile(attendeeId)', () => {
    const prefetchLimit = 3;
    let proxyInstance;

    beforeEach(() => {
      proxyInstance = proxy(attendees, profileService, prefetchLimit);
    }) 

    it('요청 시 선취한 프로필을 반환한다.', () => {
      const attendeeId = 13;
      const profile = proxyInstance.getProfile(attendeeId);

      expect(profile).toBe(makeServiceReturn(attendeeId));
      expect(spyOnProfileService.calls.count()).toBe(prefetchLimit);
    })

    it('요청 시 비선취 프로필을 반환한다.', () => {
      const attendeeId = 11;
      const profile = proxyInstance.getProfile(attendeeId);

      expect(profile).toBe(makeServiceReturn(attendeeId));
      expect(spyOnProfileService.calls.count()).toBe(prefetchLimit + 1);
    })
  })
})