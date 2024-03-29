# HTTP 헤더

## 일반 헤더

| 헤더 | 설명 |
| --- | --- |
| Connection | 클라이언트-서버가 요청/응답에 관한 옵션을 정할 수 있게 한다. |
| Date | 메시지가 만들어진 시간을 제공한다. |
| MIME-Version | MIME의 버전을 알려준다. |
| Trailer Chunked transfer | 인코딩된 메시지의 끝 부분에 위치한 헤더들의 목록을 알려준다. |
| Transfer-Encoding | 안전한 전송을 위해 어떤 인코딩이 적용됐는지 알려준다. |
| Upgrade | 업그레이드하길 원하는 버전, 프로토콜을 알려준다. |
| Via | 이 메시지가 어떤 중개자를 거쳐 왔는지 보여준다. |

## 일반 캐시 헤더

HTTP 1.0부터는 원 서버로부터 객체를 가져오는 대신 로컬 복사본으로 캐시할 수 있는 헤더를 도입했다.

| 헤더 | 설명 |
| --- | --- |
| Cache-Control | 메시지와 함께 캐시 지시자를 전달하기 위해 사용. |
| Pragma | 메시지와 함께 지시자를 전달하는 또다른 방법이다. |


## 요청 헤더

| 헤더 | 설명 |
| --- | --- |
| Client-IP | 클라이언트가 실행된 컴퓨터의 IP를 제공. |
| From | 클라이언트 사용자의 메일 주소를 제공. |
| Host | 요청의 대상이 되는 서버의 호스트명, 포트를 제공. |
| Referer | 현재 요청 URI가 들어있던 문서의 URL을 제공. |
| UA-Color | 클라이언트 디스플레이 색상 능력에 관한 정보 제공. |
| UA-CPU | 클라이언트 CPU 종류, 제조사를 알려준다. |
| UA-Disp | 클라이언트 디스플레이 능력에 대한 정보를 제공. |
| UA-OS | 클라이언트 기기에서 동작 중인 운영체제 이름, 버전 제공. |
| UA-Pixels | 클라이언트 기기 디스플레이에 관한 픽셀 정보를 제공. |
| User-Agent | 요청을 보낸 애플리케이션 이름을 서버에 알려준다. |

## Accept 관련 헤더

클라이언트의 경우 `Accept`로 자신의 가용 능력을 알려줄 수 있다.  
이를 통해 서버는 최적의 응답을 내릴 수 있도록 돕는다.

| 헤더 | 설명 |
| --- | --- |
| Accept | 서버가 보내도 되는 미디어 종류를 전달. | 
| Accept-Charset | 서버가 보내도 되는 문자집합 전달. |
| Accept-Encoding | 서버가 보내도 되는 인코딩 전달. |
| Accept-Language | 서버가 보내도 되는 언어 전달. |
| TE | 서버가 보내도 되는 확장 전송 코딩 전달. |

## 조건부 요청 헤더

클라이언트는 요청에 몇몇 제약을 넣을 수 있다.

| 헤더 | 설명 |
| --- | --- |
| Expect | 클라이언트 요청에 필요한 서버의 행동을 열거. |
| If-Match | 엔터티 태그가 주어진 엔터티 태그와 일치하는 경우 문서를 가져옴. |
| If-Modified-Since | 주어진 날짜 이후 리소스 변경이 되지 않을 시 요청 제한. | 
| If-None-Match | 엔터티 태그가 일치하는 경우에만 문서 가져옴. |
| If-Unmodified-Since | 주어진 날짜 이후 리소스 변경 시 요청 제한 | 
| Range | 리소스에 대한 특정 범위 요청 | 

## 요청 보안 헤더

| 헤더 | 설명 |
| --- | --- |
| Authorization | 클라이언트가 서버에 제공하는 인증 자체에 대한 정보를 담음. | 
| Cookie | 클라이언트가 서버에게 토큰 전달 시 사용. 보안에 영향을 줄 수 있음. | 
| Cookie2 | 요청자가 지원하는 쿠키 버전을 알려줄 때 사용. | 

## 프락시 요청 헤더

| 헤더 | 설명 |
| --- | --- |
| Max-Forwards | 다른 프락시, 게이트웨이로 전달될 수 있는 최대 횟수를 정의. Trace 메서드와 함께 사용. | 
| Proxy-Authorization | 프락시에서 인증할 때 쓰임. | 
| Proxy-Connection | 프락시와 연결을 맺을 때 사용. |

## 응답 헤더

| 헤더 | 설명 |
| --- | --- |
| Age | 응답이 얼마나 오래 됐는지를 열거. | 
| Public | 서버가 특정 리소스에 대해 지원하는 요청 메서드 목록을 알려줌. | 
| Retry-After | 현재 리소스가 사용 불가능할 때 가능한 날짜, 시간. | 
| Server | 서버 애플리케이션 이름, 버전 | 
| Title | HTML 문서에서 주어진 것과 같은 제목 | 
| Warning | 사유 구절에 있는 것보다 더 자세한 경고 메시지 | 

## 협상 헤더

| 헤더 | 설명 |
| --- | --- |
| Accept-Ranges | 서버가 자원에 대해 받아들일 수 있는 범위의 형태. | 
| Vary | 응답에 영향을 줄 수 있는 헤더들의 목록. | 

## 응답 보안 헤더

| 헤더 | 설명 |
| --- | --- |
| Proxy-Authenticate | 프락시에서 클라이언트로 보낸 인증 요구 목록. | 
| Set-Cookie | 보안에 영향을 줄 수 있으며, 서버가 클라이언트를 인증할 수 있도록 클라이언트 측에 토큰을 설정하기 위해 사용. | 
| Set-Cookie2 | Set-Cookie와 비슷하게 RFC 2965로 정의한 쿠키. | 
| WWW-Authenticate | 서버에서 클라이언트로 보낸 인증 요구 목록. | 

## 엔터티 헤더

| 헤더 | 설명 |
| --- | --- |
| Allow | 이 엔터티에 대해 수행될 수 있는 요청 메서드. |
| Location | 클라이언트에게 엔터티가 실제로 어디 위치한지 알려준다. |

## 콘텐츠 헤더

| 헤더 | 설명 |
| --- | --- |
| Content-Base | 본문에서 상대 URL을 계산하기 위한 기저 URL. |
| Content-Encoding | 본문에 적용된 인코딩. |
| Content-Language | 본문에 대해 가장 적절한 자연어. |
| Content-Length | 콘텐츠 길이. |
| Content-Location | 리소스의 위치. |
| Content-MD5 | 본문의 MD5 체크섬. |
| Content-Range | 전체 중 엔터티의 해당 범위를 바이트 단위로 표현. |
| Content-Type | 본문의 객체 종류. |

## 엔터티 캐싱 헤더

| 헤더 | 설명 |
| --- | --- |
| ETag | 엔터티 태그. | 
| Expires | 유효하지 않아 원본을 다시 받아와야 하는 시점 전달. | 
| Last-Modified | 엔터티의 최근 변경 시점 전달. | 

