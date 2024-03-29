# 샌드박스 패턴

각 모듈 간에 발생하는 결합도를 낮추고 의존성을 strict하게 관리하고 싶을 때 사용할 수 있는 디자인 패턴이다.  

이때, 각 위젯 역시 서로 소통할 수 있도록 하는 도구 세트가 필요하다.

> #### ✅ 다음을 체크하자!
> + 도구는 어디에 정의할까?
> + 도구는 어떻게 인스턴스에 추가할까?
> + 사용 가능한 도구를 어떻게 지정해줄까?
>
> #### ✅ 이에 따라 테스트 코드를 작성하자.
> + 샌드박스 생성자 함수에 위젯 모듈 함수를 전달해야 한다.
> + 도구는 샌드박스 생성자 함수에 배열, 또는 개별 인자 형태로 넘길 수 있어야 한다.
> + 샌드박스 안에서 사용하기로 지정한 도구가 유효해야 한다.
> + 샌드박스 안에서 실행할 위젯이 요청한 도구는 샌드박스가 제공해야 한다.

## 샌드박스에만 의존하는 모듈들

샌드박스에 놓고 사용할 모듈의 생성과 테스트는 간단하다.  
이유는 샌드박스 인스턴스에만 모듈들이 의존하고 있기 때문이다.  
즉, 다른 부분에서의 사이드이펙트를 고려하지 않고 테스트가 가능하므로 테스트성과 신뢰성이 높다.

