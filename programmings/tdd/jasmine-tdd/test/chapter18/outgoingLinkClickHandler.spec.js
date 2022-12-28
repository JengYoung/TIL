import { Conference } from "../../src/chapter18/Conference.js";
import "../../src/chapter18/outgoingLinkClickRecorder.js";

describe('Conference.outgoingLinkClickHandler', () => {
  'use strict';

  let clickRecorder;
  let clickHandler;

  beforeEach(() => {
    clickRecorder = Conference.outgoingLinkClickRecorder();
    spyOn(clickRecorder, "recordClick");
    
    clickHandler = Conference.outgoingLinkClickHandler(clickRecorder);
  })

  describe('handleClick()', () => {
    it('자신(handleClick)을 포함한 객체를 통해 실행되면 클릭을 기록한다.', () => {
      clickHandler.handleClick();
      expect(clickRecorder.recordClick).toHaveBeenCalled();
    })

    it('undefined가 콘텍스트로 넘어와도 클릭을 기록한다.', () => {
      clickHandler.handleClick.call(undefined);
      expect(clickRecorder.recordClick).toHaveBeenCalled();
    })

    it('빈 객체가 콘텍스트로 넘어와도 클릭을 기록한다.', () => {
      clickHandler.handleClick.call({});
      expect(clickRecorder.recordClick).toHaveBeenCalled();
    })
  })
})