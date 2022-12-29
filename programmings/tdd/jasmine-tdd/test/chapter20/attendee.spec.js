import { Conference } from "../../src/chapter20/Conference.js";

describe('Conference.attendee', () => {
  'use strict';

  let attendee;
  let firstName;
  let lastName;

  beforeEach(() => {
    firstName = '성인';
    lastName = '이';
    attendee = Conference.attendee(firstName, lastName);
  })

  it('setId(id)/getId()로 각각 PK를 지정/조회한다.', () => {
    const id = 123;
    attendee.setId(id);

    expect(attendee.getId()).toBe(id);
  })
})