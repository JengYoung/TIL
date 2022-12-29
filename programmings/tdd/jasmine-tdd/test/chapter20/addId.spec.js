import { Conference } from "../../src/chapter20/Conference.js";

describe('Conference.mixins', () => {
  'use strict';
  
  let target;

  describe('addId()', () => {
    beforeEach(() => {
      target = {};
    });

    it('target.getId가 이미 존재할 경우 예외를 던진다.', () => {
      target.getId = function getId() {};
      expect(() => {
        Conference.mixins.addId.call(target);
      }).toThrowError(Conference.mixins.addId.messages.triedToReplace + 'getId');
    })

    it('target.setId가 이미 존재할 경우 예외를 던진다.', () => {
      target.setId = function setId() {};
      expect(() => {
        Conference.mixins.addId.call(target);
      }).toThrowError(Conference.mixins.addId.messages.triedToReplace + 'setId');
    })

    describe('한 객체로 믹스인 되면', () => {
      beforeEach(() => {
        Conference.mixins.addId.call(target);
      })
      
      it('해당 프로퍼티들이 target에 추가되어야 한다.', () => {
        expect(Object.keys(target).sort()).toEqual(['getId', 'setId']);
      });

      describe('getId() & setId(idValue)', () => {
        it('setId(idValue)를 호출하지 않으면 getId()는 undefined를 반환한다.', () => {
          expect(target.getId()).toBe(undefined);
        })

        it('getId()는 setId(idValue)가 세팅한 값을 반환한다.', () => {
          const id = 'theID';
          
          target.setId(id);
          expect(target.getId()).toEqual(id);
        })
      })
    })
  })

})