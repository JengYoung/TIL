function Attendee(attendeeId, service, messanger) {
  if (!(this instanceof Attendee)) {
    return new Attendee(attendeeId);
  }

  this.attendeeId = attendeeId;

  this.service = service;
  this.messanger = messanger;
}

Attendee.prototype.reserve = function(sessionId) {
  if (this.service.reserve(this.attendeeId, sessionId)) {
    this.messanger.success(`
      좌석 예약 완료!
      고객님께서는 ${this.service.getRemainingReservations()} 좌석을 추가 예약 가능하세요.
    `)
  } else {
    this.messanger.failure('죄송합니다. 해당 좌석은 현재 예약 불가합니다.')
  }
}