# 서론

안녕하세요, 2022년 1월부터 2월까지 FAAI 프론트엔드 개발에 참여한 프론트엔드 개발 인턴 황재영입니다. 많은 주제를 고민했지만, 이번 인턴 과정에 있어 반응형 레이아웃을 작업하면서, 가장 많이 고민했던 CSS 네이밍 방법론에 대한 글을 주제로 삼기로 결정하였습니다.

CSS(Cascading Style Sheet)는 지난 웹의 발전 이래 수십년간 마크업 언어의 스타일을 지원하는 스타일 언어입니다. 스타일 문법은 단순하고 직관적이었으며, 결과를 빠르게 시각적으로 볼 수 있는 특성은 사람들을 충분히 매료시켰습니다.

하지만 어느 언어가 그렇듯, 개발자는 문법을 적용하기 위해 좋은 변수명을 지어야 합니다. 특히 개발에 참여하는 인원이 많을 수록, 네이밍에 대한 체계를 구축하는 일은 팀원들간의 코드를 이해하는 작업에 있어 상당히 중요합니다.

CSS도 자유도는 높지만, 스타일 ‘문법’을 갖고 있다는 측면에서 예외는 아니었고, 가독성과 재사용성, 유지보수성을 중요시하던 우아한 개발자들은 CSS 네이밍 방법론에 대한 고민을 하기 시작했습니다.

따라서, 이번 글은 이러한 고민 끝에 탄생한 네이밍 방법론들 중 가장 유명한 OOCSS와 BEM, 그리고 CMACSS를 살펴보고자 합니다. 또한 현재 airbnb의 CSS 체계를 예시로 어떻게 CSS 네이밍 컨벤션을 구축하는 것이 좋은지에 대해 고찰해보고자 합니다.

---

# 본론

## OOCSS (Object-oriented CSS)

**“어떻게 객체 지향적으로 스타일 문법을 적용할 것인가”**

‘객체 지향적’이라는 말은 참 범용적이면서도 어려운 말입니다. 우리는 무엇을 ‘객체 지향적’이라고 정의할 수 있을까요? 

상당히 복잡하고 어려운 개념이지만, OOCSS의 창시자인 니콜 설리반(Nicole Sullivan)의 말을 빌려보겠습니다. 

OOCSS의 핵심은 **CSS 객체**입니다. 여기서 CSS 객체란 HTML , CSS 및 JavaScript 의 독립적인 조각으로 추상화될 수 있는 반복되는 시각적 패턴을 의미합니다.

1. **구조(structure)와 외형(skin)을 분리한다.**
    
    효율적인 CSS를 작성하는 방법은, 결국 “반복되는 요소를 최대한 분리하여 재사용”하는 것입니다.
    
    이때, 우리가 선택할 수 있는 다양한 방법 중, CSS 재사용성을 늘릴 수 있는 방법은 구조와 외형을 분리하는 방법입니다.
    
    이해를 돕기 위해 다음 예시를 살펴봅시다.
    
    우선, 이러한 코드로 이루어진 버튼이 있다고 가정하겠습니다.
    
    ```html
    <body>
      <button class="primary-button">Button Primary</button>
        <button class="warning-button">Button Warning</button>
    </body>
    ```
    
    ```css
    .primary-button {
      width: 20rem;
      height: 3rem;
      border-radius: 10px;
      border: none;
      outline: none;
      color: white;
      background-color: rgb(59 130 246);
      font-size: 1rem;
      font-weight: 400;
    }
    
    .warning-button {
      width: 20rem;
      height: 3rem;
      border-radius: 10px;
      border: none;
      outline: none;
      color: white;
      background-color: rgb(251 146 60);
      font-size: 1.25rem;
      font-weight: 700;
    }
    ```
    
    ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cb40908a-d0ea-4bdc-a93f-dbb030b4162b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220225T143415Z&X-Amz-Expires=86400&X-Amz-Signature=c65f374ade467a7b9f639854917c766b5e6cc26caf726638c70431b1011e1b38&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
    
    위의 코드는 실제로 큰 문제가 발생하지 않습니다. 그렇지만, 반복되는 코드가 많아보이는 것이 분명합니다.
    
    또한 확장성이 떨어져 보입니다. 만약 버튼의 폰트 크기만 변경된 버튼, 혹은 버튼의 색상만 변경된 버튼들의 스타일을 구현하려면 어떻게 해야 할까요?
    
    지금의 코드는 이러한 확장성을 염두하지 않았기에, 새롭게 CSS 코드를 작성해야 할 것입니다.
    
    그렇다면, 해당 코드를 다음과 같이 클래스를 구조와 외형에 따라 분리, 추가시킴으로써 OOCSS를 적용하면 어떻게 되는지 살펴봅시다.
    
    ```html
    <body>
      <button class="button primary font-medium">Button Primary</button>
      <button class="button warning font-large">Button Warning</button>
    </body>
    ```
    
    ```css
    .button {
      width: 20rem;
      height: 3rem;
      border-radius: 10px;
      border: none;
      outline: none;
    }
    
    .bg-primary {
      color: white;
      background-color: rgb(59 130 246);
    }
    
    .bg-warning {
      color: white;
      background-color: rgb(251 146 60);
    }
    
    .font-medium {
      font-size: 1rem;
      font-weight: 400;
    }
    
    .font-large {
      font-size: 1.25rem;
      font-weight: 700;
    }
    ```
    
    ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cb40908a-d0ea-4bdc-a93f-dbb030b4162b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220225T143415Z&X-Amz-Expires=86400&X-Amz-Signature=c65f374ade467a7b9f639854917c766b5e6cc26caf726638c70431b1011e1b38&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
    
    분명 같은 결과를 내뱉지만, 더욱 깔끔하고, 선언적으로 느껴집니다.
    
    또한, 확장성이 매우 용이합니다. 이제는 만약 폰트 크기나 배경 색상만 다른 버튼을 만든다 하더라도, 충분히 기존의 코드만으로 대응할 수 있기 때문입니다. 따라서 구조와 
    
2. **콘테이너(container)와 내용(content)을 분리한다.**
    
    얼핏 보기에 복잡해 보이지만, 사실 아주 간단하면서도 핵심적인 내용을 하나 포함하고 있습니다. 바로 **“위치에 종속되지 않는다**”는 원칙인데요. 
    
    이 역시 예시를 통해 설명을 해보겠습니다.
    
    ```html
    <body>
      <header>
        <h1>Hello!</h1>
      </header>
      
      <button>
        <h1>CLICK!</h1>    
      </button>
      
      <div>
        <h1>Bye!</h1>
      </div>
      
      <div class="box-to-be-color-black">
        <h1>Result</h1>
      </div>
    </body>
    ```
    
    ```css
    header > h1 {
      color: orange;
    }
    
    div > h1 {
      color: red;
    }
    
    button > h1 {
      font-size: 1rem;
      color: blue;
    }
    ```
    

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/041cee0e-dedd-4e7b-a61a-7855f31d4529/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220225T143446Z&X-Amz-Expires=86400&X-Amz-Signature=6357e4f93b797431ea0736b12230d6aed268947c78f0d97e79b5b1252a11fd3c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

위의 예시에서, `Result`의 원래 의도는 그저 기본값인 검은색의 텍스트로 표시되는 것이었습니다. 그러나 여러 개의 클래스에 종속된 태그 선택자로 인해 불필요한 스타일이 적용되어 버렸습니다. 

즉, 위치에 따라서 종속적으로 스타일이 표기되었고, 이는 불필요한 스타일 오버라이딩을 초래하게 되었습니다.

따라서 니콜 설리반은 다음과 같이, 위치에 종속되지 않게 클래스를 이용하여 스타일로 조정하라고 권합니다.

```html
<body>
  <header>
    <h1 class="header-color">Hello!</h1>
  </header>
  
  <button class="button-color">
    <h1>CLICK!</h1>    
  </button>
  
  <div>
    <h1 class="container-danger">Bye!</h1>
  </div>
  
  <div class="box-to-be-color-black">
    <h1>Result</h1>
  </div>
</body>
```

```css
.header-color {
  color: orange;
}

.container-danger {
  color: red;
}

.button-color {
  color: blue;
}
```

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b4d4040b-a3b0-4478-a591-a73b7b5bdf3c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220225T143522Z&X-Amz-Expires=86400&X-Amz-Signature=5027c2ce2d0d0ada150e340d865bef0b7ff4ed34fdbc8336b08c724c7bd77501&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

클래스를 적용하여 콘텐츠의 스타일을 분리하는 것만으로, 이제 코드 작성자는 불필요한 고려를 하지 않아도 됩니다. 또한 오버라이딩이 줄어들기 때문에 프로젝트를 거시적으로 바라보았을 때, 코드의 양도 줄어든다는 장점이 있습니다.

## 단점

하지만 이 역시 완벽하지는 않은 방법론입니다. 해당 방법론을 중점으로 사용했다면, 다음과 같은 단점이 예상됩니다.

### 지나친 모듈화로 인한 생산성 저하

이 세상 애플리케이션이 모두 복잡한 구조를 갖고 있지는 않습니다.

그렇다면, 만약 프로젝트가 매우 간단한 것이라면, OOCSS를 적용하는 것이 바람직할까요? 결론부터 말하자면 그렇지 않습니다. 

클래스명을 짓는다는 것은 꽤나 적지 않은 스트레스와 비용이 들어가는 일이며, 따라서 지나친 모듈화로 인해 생산성이 저하될 가능성이 있습니다. 

### 다중 클래스의 사용으로 인한 복잡성 증가

어떻게 보면, 모듈화로 인해 파생되는 어쩔 수 없는 부가적인 단점이라고 볼 수 있겠습니다. 만약 컴포넌트 단위로 다음과 같이 여러 개를 쪼갰다고 할 때, 다음과 같은 상황이 발생할 수 있습니다.

```css
<body>
  <button class="button tobe-color-red button-hover-primary text-bold text-italic text-underline button-dark scale-hover-large">Example</button>
</body>
```

```css
.button {
  width: 20rem;
  height: 3rem;
  border-radius: 10px;
}

.tobe-color-red {
  color: red; // 개발자는 빨간 색상을 원하지만 다중 클래스 중첩 도중 적용되지 않는 문제 발생.
}

.text-bold {
  font-weight: 700;
}

.text-italic {
  font-style: italic;
}

.text-underline {
  text-decoration: underline;
}

.button-dark {
  border: 0;
  background-color: black;
  color: white;
}

.button-hover-primary:hover {
  background-color:  rgb(59 130 246);
}

.scale-hover-large:hover {
  transition: transform 0.3s;
  transform: scale(1.2);
}
```

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/417cf345-1dc7-433a-b7a4-7c883d66782a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220225T143542Z&X-Amz-Expires=86400&X-Amz-Signature=7af98a3561707e1f7966a1449276d773c538fb8232e1e6a4896535f59c3068aa&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

해당 버튼 하나를 만드는 데 약 7개의 클래스 선택자가 사용되었습니다. 이로 인하여 기존에 가지고 있던 선언성의 장점은 사라지고, 해당 스타일이 어떻게 적용되는지에 대한 복잡성은 상당히 증가하였습니다. 

또한 급하게 코드를 작성할 경우에 선택자의 스타일 중첩으로 인한 오버라이딩이 발생하는 것은 어쩌면 CSS 작성에 있어 필연적인 상황입니다. 

하지만 다음과 같이 클래스의 중첩이 많아졌을 때, 스타일이 겹쳐서 원하는 스타일 적용되지 않는 일이 발생한다면 이에 대한 오류를 추적하기가 어려워집니다. 현재도 실제로는 빨간 색의 폰트 색상을 원했지만, 스타일 선택자 우선순위로 인해 하얀색이 적용되는 상황이었습니다.

따라서, 완전히 OOCSS를 맹신하는 일은 어쩌면 불필요한 코드의 복잡성을 늘리는 일일 수 있습니다.

# 참고자료

**CSS**

[https://developer.mozilla.org/ko/docs/Web/CSS](https://developer.mozilla.org/ko/docs/Web/CSS)

**OOCSS**

[https://medium.com/witinweb/css-방법론-2-oocss-object-oriented-css-4064e1119354](https://medium.com/witinweb/css-%EB%B0%A9%EB%B2%95%EB%A1%A0-2-oocss-object-oriented-css-4064e1119354)

[https://github.com/stubbornella/oocss/wiki](https://github.com/stubbornella/oocss/wiki)
