import { Conference } from "../../src/chapter20/Conference.js";
import { ReliableJavaScript } from "../../src/chapter20/ReliableJavaScript.js";

describe('Conference.mixins', () => {
  'use strict';

  let target;
  let mixin;

  describe('idMixin()', () => {
    beforeEach(() => {
      target = {};
      mixin = Conference.mixins.idMixin();

      ReliableJavaScript.extend(target, mixin);
    });

    describe('믹스인 되면', () => {
      it('해당 프로퍼티들이 target에 추가된다.', () => {
        expect(Object.keys(target).sort()).toEqual(['getId', 'id', 'setId']);
      })

      describe('getId() & setId(idValue)', () => {
        it('setId(idValue)를 호출하지 않으면 getId()는 undefined를 반환한다', () => {
          expect(target.getId()).toBe(undefined);
        });

        it('getId()는 setId(idValue)가 세팅한 값을 반환한다.', () => {
          const id = 'theId';
          target.setId(id);

          expect(target.getId()).toEqual(id);
        })
      })
    })
  })
})