# CNAME(Canonical Name) 레코드

+ 레코드 값에 도메인 주소를 매핑함.
+ 네임 서버가 CNAME 레코드에 대한 질의를 받을 시, CNAME 레코드에 설정된 도메인 정보를 확인하고, 도메인 정보를 내부적으로 다시 질의한 결과 IP 값을 응답
+ 대표적인 예로 `www`가 있음.

예를 들어, "photos.example.com"과 "videos.example.com"이라는 두 개의 서브도메인이 있다고 가정한다.

이들을 모두 "media.example.com"으로 매핑하고자 할 경우, 

+ "media.example.com"에 CNAME 레코드를 설정하여 
+ "photos.example.com"과 "videos.example.com"을 매핑할 수 있다.  

이러한 기능을 통해 DNS 설정을 효율적으로 관리할 수 있다.