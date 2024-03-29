# TCP 성능에 대한 고려

TCP 성능의 특성을 이용하여, 애플리케이션의 요청/응답에 대한 최적화를 하여야 한다.

## 트랜잭션 지연

일반적으로 동적인 자원들을 실행하지 않는다면 **TCP 네트워크 지연**으로 인한 HTTP 지연이 가장 원인이 크다.

그 외에도 원인은 여러 개가 될 수 있다.

1. IP 주소와 포트 번호가 처음 보는 경우, DNS 인프라를 활용해야 하므로 IP 주소 변환 시 시간이 더 걸린다.

2. TCP 커넥션이 새로 만들어질 때마다 1~2초의 지연이 발생. 이것이 반복될 경우 많은 시간이 될 수 있음.

3. TCP 파이프를 통해 요청을 보내고, 인터넷을 통해 전달받은 데이터를 서버가 처리하는 데까지 시간이 걸림.

4. 웹 서버가 응답을 보내는 시간도 지연 시간에 포함.

## 성능 관련 중요 요소

일반적인 TCP 관련 지연의 경우의 숨겨진 내부 원인은 다음과 같다.

1. 핸드셰이크 설정이 복잡하다.
2. 인터넷 혼잡 제어를 위한 TCP 느린 시작
3. 데이터를 한꺼번에 전송하기 위한 네이글 알고리즘
4. TCP 편승 확인응답 지연 알고리즘
5. TIME_WAIT 지연, 포트 고갈

## TCP 커넥션 핸드셰이크 지연

새로운 커넥션을 열 때마다, 커넥션 조건을 맞추기 위해 연속 IP 패킷을 교환하는데, 작은 크기일 수록 이 커넥션이 발생하면 반복될 수록 성능이 저하될 수 있다.

### TCP 커넥션이 핸드셰이크하는 순서

1. 클라이언트가 TCP 커넥션을 위한 TCP 패킷을 서버에 보냄. (`SYN` Flag)
2. 서버가 커넥션을 받을 시 몇 가지 커넥션 매개변수를 산출, `SYN`과 `ACK`를 포함한 `TCP` 패킷을 클라이언트에 보냄.
3. 클라이언트 측은 커넥션이 잘 맺어졌음을 알리기 위해 확인응답 신호를 보냄. 이때 이 확인응답 패킷과 함께 데이터를 보냄.

### 핸드셰이크를 위해 필요 이상의 구성

결국 데이터가 작을 수록 이 지연시간이 치명적인 이유는, 이러한 일련의 과정들에서 나오는 비용이, 데이터의 크기보다 작은 경우 이 전송이 과할 수 있음을 의미한다.

### 확인응답 지연

`TCP`의 경우, 패킷 전송이 완벽하게 보장되지 않기 때문에 계속해서 자체적으로 확인 체계를 갖는다.

그 방법은, 세그먼트를 받은 다음 응답 패킷을 송신자에게 반한할 때, 특정 시간에 반환하는지를 체크하는 등이다.

만약 이것이 제 시간 안에 이뤄지지 않는다면, TCP에 의해 데이터를 다시 또 주고받는 행위가 발생하게 된다.

여기서 문제가 발생한다.  
TCP 스택은 확인 응답에 있어 너무 크기가 작을 시 데이터 패킷에 확인 응답들을 편승시키는 작업을 하게 되는데, 생각보다 요청-응답의 구조에서 편승할 수 있는 케이스가 적다.  

이로 인해 필연적으로 확인응답 지연 알고리즘에서 약 0.1~0.2초의 지연이 반복적으로 수행되면서 오히려 더 느려지는 것이다.


### TCP 느린 시작

커넥션이 만들어진지 얼마 되지 않았다면, 초반에 제한된 최대 속도로 인해 이미 활성화된 커넥션보다 느리게 주고 받는다.

예컨대 다음과 같다. TCP가 한 번에 전송 가능한 패킷 수를 제한함으로써, 송신자로 하여금 2개의 패킷을 다시 전송할 수 있는 기회를 주고, 그 이후에 또 패킷을 보내면 다음에는 4개의 패킷을 보낼 수 있게 하는 방식이다.
이것을 **혼잡 윈도를 연다**라는 말로도 표현한다.  

다만 이러한 방식이 초기에는 느리게 전달되기 때문에 지속 커넥션을 기반으로 튜닝된 커넥션보다는 느릴 수밖에 없다.

### 네이글 알고리즘, TCP_NODELAY

TCP 스택으로 어떤 데이터든지 전송 가능하게, TCP는 데이터 스트림을 제공한다.  
이때, 이전에 이야기했던 데이터가 작을 시 발생하는 문제점으로 인해, 패킷을 전송하기 전에 많은 양의 TCP 데이터를 한 개의 덩어리로 합치는 알고리즘이 네이글 알고리즘이다.

얼핏 보면 효율적이긴 하지만, 네이글 알고리즘은 단점이 존재한다. 이는 세그먼트의 크기에 의존적인 성향을 갖게 된다는 것이다.

네이글 알고리즘은 세그먼트가 최대 크기가 되지 않으면 전송하지 않고, 대기한다. 이때 다른 패킷 모두 확인응답을 받으면 비로소 최대 크기보다 작은 패킷의 전송을 허락한다. 

따라서 만약 패킷이 채워지지 않는다면 앞으로 생길지 여부를 알 수 없는 데이터를 기다리며 지연되는 시간이 발생한다. 또한, [확인응답 지연](#확인응답-지연)과의 콜라보는 무시무시하다. 확인응답을 다 받아야 보낼 수 있는데, 확인응답 지연을 걸어버리면 이 메시지마저도 0.1~0.2초 지연되는 것이다.

따라서 이와 같은 문제가 치명적이라면, 성능 향상을 위해 `TCP_NODELAY` 파라미터를 설정하는 것도 최적화 방법 중 하나다. 대신 이를 설정하면 작은 패킷이 너무 많이 생기지 않도록 주의해야 한다.

### TIME_WAIT의 누적과 포트 고갈

일반적으로는 문제를 잘 발생시키지 않긴 하지만, 유독 성능 측정에 대해 성능 저하를 발생시킨다.

`TCP Connection`의 종단에서 `Connection`을 끊어버리면 종단에서는 포트번호를 메모리의 작은 제어영역에 기록해둔다.

이를 통해 같은 IP주소가 같은 포트를 사용하는 데 발생할 수 있는 현상을 예방한다. 이는 생명주기의 약 2배(2MSL, 2분)이다.

이 2분이 일반적으로는 문제가 없다. 그런데 성능 측정 시에는 보통 클라이언트의 접속 대수를 적게 두고 부하를 일으키기 때문에 가용 포트 번호가 바닥나버리는 문제가 발생한다.


##  HTTP Conection 관리

이러한 이유들로 인해, 커넥션을 잘 관리하는 것은 매우 중요하다.  
흔히들 잘못 이해하는 `HTTP 커넥션 헤더` 부터 알아보자.

### HTTP Connection Header

Connection 헤더에는 다음 3가지 종류의 토큰이 들어갈 수 있다.

+ HTTP 헤더 필드 명은 이 커넥션에만 해당하는 헤더를 나열한다.
+ 임시 토큰 값은 커넥션에 대한 비표준 옵션을 의미한다.
+ `close` 값은 커넥션 완료 시 종료되어야 함을 의미한다.

절대 다음 커넥션에 그대로 전달하지 말자.  
모든 헤더 필드는 메시지를 다른 곳으로 전달하는 시점에 삭제해야 한다.  
프록시를 거쳐서 갈 경우 헤더의 명세가 달라질 수 있기 때문이다.

### 순차적 트랜잭션 처리에 의한 지연

커넥션 관리가 잘 이루어지지 않는다면, 느린 시작 지연으로 인해 지연이 발생하여 성능이 저하될 수 있다. 순차적으로 트랜잭션을 처리해야 할 상황이 아니라면 병렬 커넥션도 염두해보자.

## 병렬 커넥션

클라이언트가 여러 개의 커넥션을 맺어, 여러 개의 트랜잭션을 병렬로 처리하도록 하는 것이다.

### 병렬 커넥션은 빠르게 내려받는다.

하나의 커넥션으로 로드할 때보다, 각각 별도의 커넥션에서 로드를 시도하면, 결과적으로 4의 처리 값을 1로 줄이는 데 성공할 수 있다.

### 그렇다고 항상 빠르진 않다.

생각해보자. 결과적으로 서버가 부담해야 할 커넥션이 늘어난다는 것을 의미한다. 이는 결과적으로 부하를 높이고 서버의 가용성을 떨어뜨려 성능 저하를 야기할 수 있다.

### 병렬 커넥션은 더 빠르게 느껴진다.

실제로 화면에서 보이는 리소스가 직접 눈으로 보이므로, 전체를 로드하는 것보다 심리적으로 빠른 느낌을 제공한다.

## 지속 커넥션

웹 클라이언트는 같은 사이트에서 여러 개의 커넥션을 맺는데, 반복해서 요청하는 서버가 생길 수 있다. 이를 사이트 지역성이라 한다.  
따라서 `HTTP/1.1`부터는 이러한 사이트에 대해계속해서 커넥션을 연결한 상태로 있을 수 있다. 이를 지속 커넥션이라 한다.

지속 커넥션은 서버가 커넥션을 끊기 전까지 계속해서 트랜잭션 중에서도 커넥션을 유지시킨다.  
따라서 기존에 커넥션 준비하면서 발생했던 시간들을 단축시킬 수 있기 대문에 더 빠르게 데이터 전송이 가능하다.

### 지속 커넥션 vs 병렬 커넥션

사실 둘은 완전히 배척되기보다는 서로 보완적으로 사용이 가능하다. 실제로도, 지속 커넥션은 병렬 커넥션과 함께 사용될 대에 가장 효과적이다.  
최신 어플리케이션은 적은 수의 병렬 커넥션만 맺고, 이것을 지속 커넥션으로 한다.

다만 둘의 특성을 비교하자면, 지속 커넥션에게는 병렬 커넥션에선 없는 장점들이 있다.  

+ 튜닝된 커넥션 유지
+ 커넥션 사전 작업에서의 지연 최소화
+ 커넥션 수 감축

다만 단점 역시 존재한다.

+ 관리를 하지 않으면 오히려 지속적으로 점유하는 커넥션으로 인한 부하 증가
+ 빈번히 발생하지 않음에도 계속적으로 커넥션 유지하므로 불필요할 수 있음

### HTTP/1.0+ Keep-alive

> 삐빅! 이는 HTTP/1.1에서 수정되었습니다.

사실 문제가 있는 방식이지만, 아직 많은 클라이언트와 서버가 이 `keep-alive` 커넥션을 사용하기에, 배울 필요는 있다.

`keep-alive`는 얼핏 보면 분명 지속 커넥션 같은 장점이 존재한다. 실제로도 지속 커넥션을 지원하기 위해 확장한 방식이다.  

이는 다음과 같은 방식이다.

1. 클라이언트는 `Connection: Keep-Alive` header 추가
2. 서버에 요청
3. 서버는 여부를 판단하여 헤더에 `Connection: Keep-Alive` 추가 or 추가하지 않음
4. 클라이언트는 응답 헤더를 보고 연결을 할지, 닫을지 결정

### `Keep-Alive` 옵션

여기서 중요한 건, `Keep-Alive` 헤더는 그저 커넥션을 유지하기를 바라는 요청일 뿐이다. 굳이 서버가 이를 따를 필요가 없다.  
언제든지 커넥션은 끊길 수 있으며, `keep-alive` 커넥션에서 처리하는 트랜잭션 수도 제한할 수 있다.

아래는 기타 옵션들이다.

+ `timeout`: 이 파라미터는 얼마간 커넥션이 이어질지를 알려주지만, 보장하지는 않는다.
+ `max`: 이 파라미터는 커넥션이 몇 개까지 트랜잭션 처리를 유지할 것인지를 말하지만, 이 역시 보장하지 않는다.

이를 다음과 같이 적어둔다.

```
Connection: Keep-Alive
Keep-Alive: max=5, timeout=120
```

### 주의사항

`Keep-Alive` 커넥션은 다음과 같은 몇 가지 제한과 규칙이 있다.

+ `HTTP/1.0`에서 기본으로 사용하지 않는다.
+ 지속적인 연결을 위해 모든 메시지에 이 헤더를 넣어야 한다.
+ 본문의 길이를 알 수 있어야 커넥션 유지가 가능하다. 즉, 정확한 `Content-Length`와 함께 멀티파트 미디어 형식을 가지거나, 청크 전송으로 인코드되어야 한다. 이는 트랜잭션의 끝나는 시점과 시작점을 인지하지 못하기 때문이다.
+ 프락시와 게이트웨이는 기존 명시된 헤더를 항상 꼭 전달하기 전에 제거하여야 한다.
+ 멍청한 프락시에 주의해야 한다.

### 멍청한 프락시

결국 Keep-Alive의 핵심은 `Connection`이 이루어질 것임을 서로 인지해야 한다는 점이다.  
그런데, 간혹 옛 서버들은 이러한 커넥션을 인지하지 못하고 있다.  
이것이 프락시에서 이루어진다면? 다음과 같은 현상이 일어난다.


> 1. 클라이언트 - Keep-Alive 담아서 요청
> 2. 프락시 - 받고 서버로 전달
> 3. 서버는 응답하여 `Keep-Alive` 하겠다고 응답
> 4. 이때, **프락시는 이 헤더의 의미**를 모르므로, 그 다음 역할인 트랜잭션을 완료한 이후 커넥션을 끊으려고 대기하고 있다. 문제는, 프락시는 이 헤더를 그대로 다시 클라이언트에 전달한다.
> 5. 클라이언트는 연결이 된 줄 알고 좋아하지만, 실제로는 연결 유지가 되지 않았다!

따라서 항상 홉별 헤더를 사용하는 것에 대해 주의하자. 이것이 예기치 않은 오류의 주범이 될 수 있다.

### Proxy-Connection

이에 대한 대안으로, 브라우저 및 프락시 개발자들은 헤더를 추가로 만들어냈다.  
`Proxy-Connection`이 그것인데, 이는 클라이언트가 프락시로 요청할 때 사용하는 헤더이다.  
이 옵션을 사용하면 만약 프락시가 그대로 전달되더라도, 웹 서버가 무시하기 때문에 연결은 맺어지지 않고, 영향이 없다. 또한 영리한 프락시는 이를 `Connection`으로 바꿔주기도 한다.

그렇지만 또 안타까운 점은, 이것이 모든 상황에서 되지 않는다는 점이다.
만약 멍청한 프락시의 양 옆에 영리한 프락시가 있다면, 결과적으로 `Proxy-Connection`이 `Connection`으로 치환되어, 똑같은 문제가 발생한다.

> 이것이 HTTP/1.1에서 해당 명세가 지속 커넥션을 추가로 지원하게 된 이유다.

## 파이프라인 커넥션

지속 커넥션을 통해 요청을 파이프라이닝할 수 있다.  
이것이 무슨 이야기냐면, 어떤 요청이 들어오면 응답 도착 전까지 큐에 쌓을 수 있다는 것이다.

이것이 의미하는 것은, 네트워크상의 왕복을 제거하고 일단 큐에 쌓아둔다는 점을 통해, 대기시간을 단축시킬 수 있다는 의미이다.  
다만 이는 여러 조건을 따져야 한다.

+ 지속 커넥션이어야 한다.
+ 응답은 요청 순서와 같게 와야 한다.
+ 클라이언트는 서버의 사유로 인해 언제 커넥션이 끊어지더라도, 다시 요청을 보낼 준비가 되어 있어야 한다.
+ 반복해서 보낼 경우 문제가 생길 수 있는 요청은 파이프라인을 통해 보낼 수 없다. (ex: POST, PATCH, ...)

## 커넥션 끊기의 딜레마

커넥션을 끊어야 하는 상황은 분명 있어야 하지만, 이 끊기에 대한 기준이 굉장히 모호하다.  
어떠한 서버든 커넥션을 끊을 수 있다. 예컨대 계속해서 요청을 전송하지 않고 유휴하지 않으면 메모리를 낭비하는 것이므로 커넥션을 제거해야 한다.  
하지만 클라이언트가 언제 재전송할 것인지를 모르기 때문에, 이러한 임의적인 중단이 벌어질 사이드 이펙트 역시 존재한다.  

## Content-Length, Truncation

항상 본문의 크기 값을 지칭하는 `Content-Length` 헤더를 갖고 있어야 한다.    
이는 오래된 서버는 자신이 커넥션을 끊으면 데이터 전송이 끝났음을 의미하는 형태로 개발되어 있는데, 실제 전달값이 일치하지 않을 수 있기 때문이다.

만약 수신자가 캐시 프락시라면 정정하지 말고 메세지를 전달하자.  
자칫 모두 전송되지 않은 데이터가 완전히 보내진 데이터로 인식이 될 수 있기 때문이다.

## 멱등성

파이프라인은 멱등성을 가진 메서드로만 처리해야 한다.  
이는, 커넥션이 끊어지더라도 재전송을 했을 때, 미칠 수 있는 결과가 예상 가능한 범위어야 하기 때문이다.  
만약 비멱등인 요청을 다시 보내야 한다면, 요청에 대한 응답을 받을 때까지 기다려야 한다.  
만약 끊어진다 해도, 재요청을 사용자의 제어 하에 해야 한다. (ex: 다시 전송을 시도하시겠어요? 모달 띄우기)


## 우아한 커넥션 끊기

애플리케이션은 연결에 있어 TCP 입력 채널 / 출력 채널 중 하나만 끊거나 둘 다 끊을 수 있다.  
보통 이를 다음과 같이 표현한다.

+ 전체 끊기: 둘 다 끊을 경우
+ 절반 끊기: 둘 중 하나만 끊을 경우

애플리케이션이 각기 다른 HTTP 클라이언트 / 서버 / 프락시와 통신할 때, 그리고 그들과 파이프라인 지속 커넥션을 유지할 때 예상치 못한 에러를 발생하는 것을 예방하려면, 절반 끊기를 사용해야 한다.

하지만 대개 출력 채널을 끊게 좋다.  
이유는 다음과 같다.

> 1. 클라이언트가 요청을 11번째 보냈다.
> 2. 서버가 10개까지 처리하고 종료했다.
> 3. 클라이언트는 요청이 성공적으로 전달되었다고 생각하지만 서버에서는 아예 요청을 처리하지 않고, 입력 버퍼에 있는 데이터를 지워버린다.

안타깝지만 이러한 우아한 커넥션 끊기는, 상대 서버가 이렇게 해주리란 보장이 없다.  
따라서 지속적으로 상태 검사를 주기적으로 실시해야 하며, 혹은 특정 타임아웃을 설정하여 이를 초과하면 강제로 끊도록 시도할 수 있을 것이다.