import { Conference } from "../../src/chapter10/Conference.js"
import "../../src/chapter10/Presentation.js"
import "../../src/chapter10/presentationFactory.js"
import "../../src/chapter10/VendorPresentation.js"

describe('presentationFactory', () => {
  const factory = Conference.presentationFactory();
  const baseParameter = {
    title: '황재영을 구글로!',
    presenter: '래리 페이지'
  }

  describe('create(objectLiteral)', () => {
    it('파라미터에 이상한 프로퍼티가 있으면 예외를 던진다.', () => {
      const badProp = 'badProperty 😈';

      function createWithUnexpectedProperties() {
        const badParam = {};
        badParam[badProp] = 'unexpected!';

        factory.create(badParam);
        
      }
      expect(createWithUnexpectedProperties).toThrowError(
        Conference.presentationFactory.messages.unexpectedProperty + badProp
      );
    })
  });

  describe('기본 프로퍼티만 있을 경우', () => {
    const fakePresentation = { title: '황재영을 나사로! 🚀' };
    let spyOnConstructor;
    let returnedPresentation;

    beforeEach(() => {
      spyOnConstructor = spyOn(Conference, 'Presentation').and.returnValue(fakePresentation);
      returnedPresentation = factory.create(baseParameter)
    });

    it('모든 값을 Presentation 생성자에 넘긴다', () => {
      expect(spyOnConstructor).toHaveBeenCalledWith(
        baseParameter.title, baseParameter.presenter
      )
    });

    it('Presentation 생성자를 딱 한 번만 호출한다.', () => {
      expect(spyOnConstructor.calls.count()).toBe(1);
    });

    it('생성한 Presentation을 반환한다.', () => {
      expect(factory.create(baseParameter)).toBe(fakePresentation);
    });
  })

  describe('VendorPresentation 프로퍼티가 적어도 하나 이상 있을 경우', () => {
    const vendorParameter = {
      title: '재영이를 애플...은 별로고 페이스북으로!',
      presenter: '마크 주커버그',
      vendor: '페이스북',
      product: '씨유레터'
    }
    const fakeVendorPresentation = { title: vendorParameter.title };
    
    let spyOnConstructor;

    beforeEach(() => {
      spyOnConstructor = spyOn(Conference, 'VendorPresentation').and.returnValue(fakeVendorPresentation);
    });

    it('VendorPresentation을 생성해본다.', () => {
      let expectedCallCount = 0;

      function createParam(propName) {
        const param = {};
        let p; 
        for (p in baseParameter) {
          param[p] = baseParameter[p];
        }

        param[propName] = vendorParameter[propName];
        return param;
      }

      ['vendor', 'product'].forEach((propName) => {
        const param = createParam(propName);
        const presentation = factory.create(param);
        
        expect(spyOnConstructor.calls.count()).toBe(++expectedCallCount);
      })
    })

    it('모든 값을 VendorPresentation 생성자에 넘긴다.', () => {
      factory.create(vendorParameter);

      expect(spyOnConstructor).toHaveBeenCalledWith(
        vendorParameter.title,
        vendorParameter.presenter,
        vendorParameter.vendor,
        vendorParameter.product
      )
    })

    it('VendorPresentation 생성자를 딱 한 번만 호출한다.', () => {
      factory.create(vendorParameter);
      expect(spyOnConstructor.calls.count()).toBe(1);
    })

    it('생성한 VendorPresentation을 반환한다.', () => {
      expect(factory.create(vendorParameter)).toBe(fakeVendorPresentation);
    })
  })
})