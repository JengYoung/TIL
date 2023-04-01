# TYPEORM

TypeORM은 TypeScript와 JavaScript를 위한 ORM(Object-Relational Mapping) 프레임워크. NestJS, Express, Koa 등의 Node.js 프레임워크와 함께 사용할 수 있는 통합된 API를 제공한다.

ORM은 객체를 데이터베이스 레코드와 매핑하고, 데이터베이스와 상호작용하기 위한 인터페이스를 제공한다.
또한, 다양한 데이터베이스 시스템(MySQL, Postgres, SQLite, Microsoft SQL Server, Oracle, MongoDB 등)을 지원하며, Active Record와 Data Mapper 패턴을 모두 지원한다. 

이를 통해 개발자는 데이터베이스와의 상호작용을 추상화하고, 데이터베이스 스키마를 TypeScript 클래스로 정의할 수 있다.

Entity, Repository, Connection, Migration 등의 개념을 제공한다. 

+ `Entity`: 데이터베이스 테이블과 매핑되는 TypeScript 클래스
+ `Repository`: 데이터베이스와 상호작용할 수 있는 메서드를 제공하는 객체 
+ `Connection`: 데이터베이스 연결을 나타내는 객체
+ `Migration`: 데이터베이스 스키마의 변경 사항을 관리하는 객체