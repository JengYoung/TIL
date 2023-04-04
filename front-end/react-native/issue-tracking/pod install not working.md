# 배경

RN에서 ios쪽에서 Pod을 설치하던 도중 에러가 났다.
```bash
# ios directory에서 다음을 입력했다.
pod install
```

## 오류 내용

> /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems.rb:283:in `find_spec_for_exe': can't find gem cocoapods (>= 0.a) with executable pod (Gem::GemNotFoundException)

## 해결 방법

### 1. Gem이란 무엇인가

일단 모든 에러들을 처리하지 못하는 이유는 내가 하나하나를 정확히 인지하지 못하고 있기 때문이다.

여기서 내가 당황스러웠던 건 `Gem`이었다. 도대체 `Gem`이란 무엇일까?

일단 `Gem`이란 루비에서 지원하는 페키지 시스템이라 한다.  
레일즈가 하나의 거대한 프레임워크라고 한다면, `Gem`은 이를 돌아가게끔 하는 패키지를 관리하는 라이브러리다.

#### 2. 그러면, 이러한 Ruby는 왜 설치해야할까?

리액트 네이티브를 온전히 IOS 패키지로 빌드하는 것은 단순히 `JavaScript`로 되지 않는다.  
JavaScript 코드는 로 변환이 되어야 하고, 그 과정에서 `XCode`에서 빌드가 되어야 한다.

이때, 문제는 XCode에서 사용하려면 기존의 환경으로는 불가하다.  
이를 도와줄 패키지 매니저가 필요한데,  `cocoapods`를 통해서, XCode와 연결시킬 수 있다.


다음을 입력하여, Ruby를 기반으로 `cocoapods`와 관련된 네이티브 앱 개발에 필요한 `gem`들을 설치할 수 있도록 해야 한다.  

`cocoapods`는 IOS 네이티브 코드의 종속성 관리를 위해 사용되는 패키지이다. 
이는 `ruby`로 작성되어 있기에 Ruby를 사용하는 것이다. 공식문서에도 이렇게 쓰여져 있다.

> CocoaPods is built with Ruby and it will be installable with the default Ruby available on macOS.

```bash
bundle install
```


결과적으로 위의 절차를 통해 `React-native`를 생성하는 과정에서 생성된 `GemFile`에 대해 필요한 패키지들을 install하게 되었다.  
이 내용을 한 번 보자.  


```shell
source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby File.read(File.join(__dir__, '.ruby-version')).strip

gem 'cocoapods', '~> 1.11', '>= 1.11.3'
```

따라서 이를 통해 `cocoapods`에 대한 의존성을 관리해줄 수 있고, 그렇기에 `ruby`에 대한 의존성이 발생하는 것이다.

#### 3. (결론) 그냥 `cocoapods`를 잘 설치해주면 되겠다.

따라서 `pod install`을 해주기 위해서 `cocoapods`만 잘 설칠해주면 된다.  
그리고 이는 `ruby`라는 큰 틀에서 수행되어야 하므로, `gem install cocoapods`를 해주자.

```bash
gem install cocoapods
```

잘 동작한다.

<img width="681" alt="image" src="https://user-images.githubusercontent.com/78713176/228419221-bf776191-5f2a-44f6-b20c-76e7b031fc0c.png">
