import DIContainer from "./DIContainer.js";

const MyApp = {};

MyApp.diContainer = new DIContainer();
MyApp.diContainer.register(
  'Service',
  [],
  function() {
    return new ConferenceWebSvc();
  }
);

MyApp.diContainer.register(
  'Messenger',
  [],
  function() {
    return new Messenger();
  }
)

MyApp.diContainer.register(
  'AttendeeFactory',
  ['Service', 'Messenger'], // Attendee는 service 및 messenger에 의존한다.
  function (service, messenger) {
    return function(attendeeId) {
      return new Attendee(service, messenger, attendeeId);
    }
  }
)