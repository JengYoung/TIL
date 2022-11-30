# 개방 폐쇄 원칙

기존에는 다음과 같이 쓰여져 있었다.

> - 확장에는 열려있고 수정에는 닫혀있도록 한다.
> - 기존의 코드를 변경하지 않는다(Closed).
> - 기능을 추가할 수 있도록(Open) 설계가 되어야 한다.

지금도 풋내기지만, 더 영락없는 풋내기 같은 글이다.  
이런 글은 누군가에게 사유할 수 있는 힘을 주지 못한다.  
오히려 나중에 정작 필요할 때 봐도 이해가 되지 않는 글이 될 수 있다는 거다.

> **글은 단순 기록의 목적이 아닌, 사유의 목적에서 작성되어야 한다. 누군가에게 스스로 생각해볼 수 있는 힘을 주어야 한다.**


## 🚀 기존의 코드를 변경하지 않고도 개발할 수 있다고?

이는 함수형 프로그래밍을 생각해보면 충분히 가능하다.  
내 생각에, 이 핵심은 **결합도를 어떻게 낮추느냐**에 달려 있다.


### 개발자 D! 폼을 만들어주세요.

개발자 D는 이제 <단일 책임 원칙>을 잘 적용하여 카페 프로젝트를 무사히 마칠 수 있었다. 🚀  
그랬더니, 이제는 2번째 요구가 나왔다.

> 저희가 이번에 업주들 관리에 필요한 입력 폼을 만들어야 해요. 
> 조건은 id는 4~12자, 패스워드는 8~20자로 되어 있어요. 아니면 그냥 처리 안되게만 해주세요.
> DB에서 유효한 계정인지 확인 후 맞으면 로그인하는 방식이에요.
> 개발자 D! 언제까지 되죠?

~~... 돈만 더 주신다면...크흡~~

그렇게 속으로 투덜대며 허겁지겁 폼을 만들기 시작했다.

```js
class Form {
  constructor(id, password) {
    this.state = {
      id, 
      password
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  }

  async submit() {
    return (this.state.id.length >= 4 && 
      this.state.id.length >= 12 && 
      this.state.password.length >= 8 && 
      this.state.password.length <= 20) && 
      await this.login(this.state.id, this.state.password)
  }
  
  async login() {
    // 대충 서버에 전달해서 서버에서는 로그인에 관한 로직을 처리하고 토큰을 반환하는 메서드
    const authInfo = await request.post('/login', { id, password })
    return authInfo;
  }
}
```

### 🔥 개발자 D! 갑자기 요구사항이 바뀌었어요...

그렇게 퇴근하려던 찰나, 갑자기 요구사항을 바꿔주셨다.

> 에러 메시지를 반드시 처리해줘야 한대요.
> 이거 처리 가능하실까요?

하... 다시 또 **로직을 바꿔야 한다.**

```js
async submit() {
  try {
    if (!this.state.id.length >= 4 && this.state.id.length >= 12) throw new Error('Invalid ID');
    
    if (this.state.password.length >= 8 && this.state.password.length <= 20) throw new Error('Invalid Password');
    
    const res = await this.login(this.state.id, this.state.password);
    return res;
  } catch(e) {
    console.error(e);
  }
}
```

호다닥 2분만에 바꿔주면서 그렇게 허겁지겁 퇴근했다. 
개발자 D는 퇴근하며 생각했다.

> '이 회사는 퇴근 전까지 무섭군... 😖'

### 🤯 개발자 D! 이 폼 이벤트 신청 페이지에서도 쓸 수 있을까요? 🥰

그렇게 꿀잠 자고 온 개발자 D.  
잠이 없어지니, 이제는 일이 찾아왔다.

> 개발자 D! 어제 진~짜 고생 많으셨어요 🙆🏻
> 그런데 이거, 혹시 저희가 내일까지 이벤트 실시할 거 같은데, 폼이 필요하거든요!
> 검증란만 바꿔서 쓸 수 있을까요~? (헤헤) 대충 데이터만 바꾸면 되는 거 아닌가요!

... 아침부터 피곤해진다!


## 해결 방법 - 로직들을 확장성을 고려하며 설계하자.

사실 그렇게 피곤하지 않고, 매우 빈번하게 발생하는 일이다.  
확장성을 고려하면서 개발한다는 건, 꽤나 적지 않은 숙련도를 필요로 하기 때문이다.  
이게 쉬웠다면, 이미 `npm`에서는 패키지로 차고 넘쳤을 거다. 개발이 그렇게 쉬울 수 없으니!

따라서, 지금 전지적 시점에서 보면, 나라면 이렇게 짰을 거다.

> 참고로, 대충 짰으니 세세한 로직보다는 흐름을 이해하길 바란다.

```js
class Form {
  // forms: { key: string; value: string; validate: () => boolean, message: string; }[]
  constructor(forms) {
    this.state = {
      forms,
      errors: []
    }
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    }
  }

  sendSuccessMessage() {
    console.log('Success! 🌈')
  }

  sendErrorMessage() {
    console.error(this.state.errors.join('\n'));
    this.cleanErrorMessage();
  }

  async submitWithAPI(checkCallback, route, payload) {
    try {
      if (this.allValid) {
        const res = await checkCallback(route, payload);
        
        return res;
      }
    } catch(e) {
      this.sendErrorMessage()
    }
  }

  cleanErrorMessage() {
    this.setState({
      errors: []
    })
  }

  async submit(successMessage) {
    try {
      if (this.allValid) {
        this.sendSuccessMessage(successMessage)
      }
    } catch(e) {
      this.sendErrorMessage();
    }
  }

  get allValid() {
    return Object.keys(this.state.forms).every(({ value, validate, message }) => {
      const res = validate(value);
      if (!res) this.state.errors.push(message);

      return res;
    }) 
  }
}
```

이렇게 짜면 어떨까?  
이제 `validate`는 외부에서 입력할 수 있게 했으므로 확장성은 무한하다.

단지 폼 클래스가 하는 역할은 모든 유효성이 유효한지만 체크하고, API가 있으면 콜백을 통해 체크하고 결과를 반환하는 거다.

또한, API가 있는 것과 그냥 제출하는 용도를 구분했고, 목적에 따라서 성공과 에러 메시지를 따로 처리할 수 있는 메서드를 만들었다.

**이것이 의미하는 강력한 장점은, 이제 문제가 생기는 부분만 따로 고치면 된다는 것이다.**  
결합도가 낮기 때문에, 내부 코드를 건드릴 것이 현저히 줄어든다. 문제가 있는 메서드만 수정하면 되는 것이기 때문이다.  
확장성은 더욱 간편해졌다. 정말 공통되는 필요한 기능들을 최소한으로 구분했기 때문에, 만약 성공 메시지 로직을 바꾸고 싶다면 전체를 수정하는 것이 아닌 `sendSuccessMessage` 메서드만 오버라이딩 시켜주면서 상속시키면 그만이다.

# 결론

내 생각에는 어떻게 보면, 개방/폐쇄 원칙이란 단일 책임 원칙을 필수적으로 이해해야만 가능한 우너칙이라 생각한다.  
반대로, 단일 책임 원칙은 이러한 개방/폐쇄의 원칙에서 얻을 수 있는 장점을 누리기 위해 파생된 원칙이 아닐까 싶다.

생각보다 이를 막상 일일이 케이스를 생각하며 코드로 치는 것이 에너지가 많이 든다는 것을 처음 알았다.  
이 세상 멋진 원칙과 패턴을 설계한 개발자들, 모두 어썸하시다. 🚀