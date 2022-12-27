import { Conference } from "./Conference.js";

Conference.attendeeProfileProxy = function(attendees, profileService, prefetchLimit) {
  'use strict';

  const prefetched = {};

  function prefetch(attendeeId) {
    prefetched[attendeeId] = profileService.getProfile(attendeeId);
  }

  if (prefetchLimit > attendees.length) {
    prefetchLimit = attendees.length;
  }

  (() => {
    const sortedAttendees = [...attendees].sort((a, b) => {
      return (b.profileViews || 0) - (a.profileViews || 0);
    })

    for (let i = 0; i < prefetchLimit; i += 1) {
      prefetch(sortedAttendees[i].attendeeId)
    }
  })();

  return {
    getProfile(attendeeId) {
      return prefetched[attendeeId] || profileService.getProfile(attendeeId);
    }
  }
}