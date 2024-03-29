# 옵저버 패턴

## 예시) 신문 구독

어떤 독자가 신문을 구독한다면, 독자가 누구든지 사실 신문 발행자는 관심이 없다.  
그저 받은 돈만큼 신문을 모든 독자에게 약속된 시간에 발행하는 것이 이 발행자의 역할이다.

이러한 신문 구독은 옵저버 패턴과 닮아 있다.

+ 신문 발행자: 의존성을 여럿 거느린 객체
+ 신문 구독자: 의존성
+ 독자의 지식(상태): 매일 신문이 발행되는 순간에 변함
+ 알림: 신문이 배달되었거나, 내용이 잘못되었음을 공지한다.

## 의존성은 결합도 낮은 코드를 작성하는 데 도움을 준다.

관찰자 패턴에서 의존성은 오히려 세밀하게 관리하여 더욱 안정성 높은 코드를 만들기 위한 것으로 인식된다.

+ 대상자 간의 의존성, 
+ 상태를 바꾸는 객체, 
+ 대상의 상태 변경을 통지받는 이들의 옵저버를 

세밀하고 정교하게 정의함으로써 문제를 해결한다.

## 구성 요소

+ 관찰자
+ 관찰할 객체(대상자)

### 대상자

다음 3가지 기능을 반드시 관찰자에게 제공해야 한다.

+ 관찰자가 알림을 받을 수 있도록 등록하는 기능
+ 알림을 받지 않도록 해지하는 기능
+ 대상자가 관찰자에게 업데이트를 알리는 기능

### 관찰자

대상자가 변경 사실을 자신에게 알려줄 때 호출할 메서드를 전달한다.
