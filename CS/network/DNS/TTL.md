# TTL 

DNS에 질의하고 응답받은 결과 값을 캐시에서 유지하는 시간을 의미한다.

TTL 값을 늘려 캐시를 많이 이용하면, 재귀적 쿼리로 인한 응답 시간을 단축시킬 수 있어 네트워크 응답 시간이 짧아진다.

그러나 DNS에서 도메인 관련 정보가 변경되면, TTL 값이 클 시 갱신이 많이 늦어지므로 주의해야 한다.

기본 TTL 값은 다음과 같다.

| 운영체제 | 기본 TTL 값(초) |
| --- | --- |
| 윈도 | 3,600 |
| 리눅스 | 10,800 | 