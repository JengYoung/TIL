# **Webpack의 기본 구조**

## **✔ 기초 개념 점검**

### **번들이란**

![](https://images.velog.io/images/young_pallete/post/4c123cff-b87f-4037-9dfd-920ae9e7fee0/image.png)
의존성이 있는 파일들을 묶어주면서 의존성은 유지하되 하나의 파일로 만드는 과정.

---

### **웹팩의 번들 과정**

우선 합칠 파일의 확장자들이 매우 다양하다.

- js
- sass
- hbs (템플릿 엔진. 특정한 양식에 따라 데이터 출력해줌)
- png, jpg, ...

이러한 확장자들을 가진,

1. 의존성 있는 모듈들(Modules With Dependencies)을
2. 확장자 별로 하나의 파일로 합쳐진 정적인 자산(Static Sssets)

으로 만드는 번들을 수행하는 구조를 갖고 있다.

---

### **의존성**

어떤 모듈이 다른 모듈을 불러와 사용하고, 참조하는 성질.

> 이때 어떤 모듈을 불러온 파일을 **[불러온 모듈에 대한 의존성이 있다**고 표현한다.

```
//webpack-cli 웹팩을 실행하는 명령어 제공
npm install webpack webpack-cli --save-dev

//npx로 node_modules > .bin에 직접 다가가지 않고 쉽게 실행
npx webpack --[키]=[값]
```
