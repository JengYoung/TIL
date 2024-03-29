# DTO

DTO(Data Transfer Object)는 계층간 DB, 외부 시스템과의 데이터 교환을 위한 객체다. 즉, 데이터를 DB 등으로부터 얻어 결과적으로 서비스나 컨트롤러 등에 보낼 때 사용하는 객체이다.  

데이터베이스나 외부 시스템이 제공하는 데이터를 담아서, 비즈니스 로직이나 프리젠테이션 로직 등에서 사용한다. 

DTO는 일반적으로 
+ getter/setter 메서드와 생성자를 가지며
+ 필드는 private으로 선언된다.

DTO는 계층 간 데이터 교환을 위해 사용되므로, 각 계층에서 필요한 데이터만 포함된다.  
예를 들어, 데이터베이스에서 조회한 데이터를 `Presentation Layer`에서 사용해야 할 때, DTO를 사용하여 데이터를 전달할 수 있다. 

이를 통해 각 계층에서 필요한 데이터만 전달하고, 불필요한 데이터는 제외할 수 있으며, 보안과 성능에도 이점이 있다.

DTO는 데이터의 일관성과 무결성, 유효성을 보장하기 위해 사용된다.  
데이터를 전송하거나 저장하는 과정에서 DTO를 사용하면, 데이터 변형이나 오류를 방지할 수 있다. 또한, DTO는 로직과 관련이 없기 때문에, 코드의 가독성과 유지보수성을 높일 수 있다.

## 작성 방법

+ 인터페이스
+ 클래스(`NestJS`에서는 클래스로 작성하는 것을 추천한다.)