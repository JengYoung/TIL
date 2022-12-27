import { Conference } from "../../src/chapter15/Conference.js";
import  "../../src/chapter15/presenterEvaluation.js";

describe('Conference.presenterEvalutaion', () => {
  'use strict';

  let evaluation;

  beforeEach(() => {
    evaluation = Conference.presenterEvaluation();
  });

  describe('setPresenter(presenterName)', () => {
    it('호출부 인스턴스를 반환한다.', () => {
      expect(evaluation.setPresenter('발표자 이름')).toBe(evaluation);
    })

    it('발표자 이름을 저장한다', () => {
      const name = '우주 최강 개발자 황재영';
      evaluation.setPresenter(name);
      expect(evaluation.getPresenter()).toEqual(name);
    })
  });

  describe('체이닝 가능한 세터 함수를 내놓는다.', () => {
    it('이 함수는 자신을 실행한 인스턴스를 반환한다.', () => {
      const validCalls = [
        (ev) => ev.setPresenter('우주 최강 개발자 황재영'),
        (ev) => ev.setPresentation('우주 최강의 프레젠테이션')
      ]

      validCalls.forEach((fn) => {
        expect(fn(evaluation)).toBe(evaluation);
      })
    })
  })
})