# Pipes

`PipeTransform`으로 구현된, `@injectable`으로 annotated된 데코레이터 클래스를 의미한다.

![image](https://user-images.githubusercontent.com/78713176/224966316-ed1367e0-b77a-4f85-b87b-f1750d4f5eaf.png)


## 목적

2가지를 수행하기 위해 한다.

+ `transformation`: 문자의 타입, 값 등을 정제하고 변환하기 위해 사용한다.
+ `validation`: 해당 들어온 값이 유효한지를 검증하기 위해 사용한다.


## 생성 방법

NestJS에서 파이프(Pipe)를 사용하는 방법은 다음과 같다.

### 1. 파이프 클래스 생성하기

먼저, 파이프를 사용하기 위해서는 파이프 클래스를 생성해야 한다.  
파이프 클래스는 `PipeTransform` 인터페이스를 구현해야 하며, `transform()` 메서드를 구현하여 파이프의 동작을 정의한다.

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // 파이프의 동작을 정의하는 코드 작성
    return value;
  }
}
```

### 2. 컨트롤러에서 파이프 사용하기

파이프 클래스를 작성한 후에는, 컨트롤러에서 파이프를 사용할 수 있다. 파이프를 사용하기 위해서는 해당 파이프 클래스를 `@UsePipes()` 데코레이터와 함께 사용하면 된다.

```typescript
import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { MyPipe } from './my.pipe';

@Controller('users')
export class UsersController {
  @Get(':id')
  @UsePipes(new MyPipe())
  getUserById(@Param('id') id: number) {
    // 파이프를 통해 전달된 파라미터를 처리하는 코드 작성
  }
}
```

### 3. 전역 파이프 등록하기

전역 파이프를 등록하면, 컨트롤러나 모듈에서 파이프를 별도로 등록하지 않아도 자동으로 파이프가 적용된다. 전역 파이프를 등록하려면, `app.module.ts` 파일에서 다음과 같이 `APP_PIPE` 프로바이더를 등록해주면 된다.

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MyPipe } from './my.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: MyPipe,
    },
  ],
})
export class AppModule {}
```

위와 같이 전역 파이프를 등록하면, 모든 컨트롤러에서 `MyPipe` 파이프가 자동으로 적용된다.

## Level에 따른 사용법

### 1. Global Pipes

애플리케이션의 모든 컨트롤러에 적용되는 파이프다. 전역 파이프를 설정하려면 main.ts 파일에서 app 객체를 만들 때 useGlobalPipes() 메서드를 호출하여 파이프 배열을 전달해야 한다.

### 2. Controller-level Pipes

컨트롤러(Controller)에 지정된 파이프다. @UsePipes() 데코레이터를 사용하여 지정할 수 있다. 이 방법은 컨트롤러마다 다른 파이프를 사용해야 할 때 유용하다.

### 2. Parameter-level Pipes

파라미터(Controller)에 지정된 파이프다. 2번째 인자에 파이프를 전달하여 사용한다. 이 방법은 특정 파라미터에만 파이프를 사용해야 할 때 유용하다.

### 3. Action-level Pipes

액션(Action)에 지정된 파이프다. @UsePipes() 데코레이터를 사용하여 지정할 수 있다. 이 방법은 특정 액션에서 다른 파이프를 사용해야 할 때 유용하다.