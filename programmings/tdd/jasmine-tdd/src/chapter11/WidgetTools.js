import { Conference } from "./Conference.js";

Conference.WidgetTools = {};
Conference.WidgetTools.attendeeNames = function(sandbox, injectedAttendeeWebAPI) {
  'use strict';

  const attendeeWebAPI = injectedAttendeeWebAPI || Conference.attendeeWebAPI();

  sandbox.attendeeNames = {
    getAll() {
      return attendeeWebAPI.getAll()
        .then((attendees) => {
          const names = [];
          attendees.forEach((attendee) => {
            names.push(attendee.getFullName());
          })
          return names;
        })
    }
  }
}