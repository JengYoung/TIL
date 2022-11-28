> 오늘 `cocoapods`의 사용법을 정확히 인지하지 못하여 약 4시간을 날렸다.  
>  같은 문제를 반복하지 않기 위해 글로 남긴다.

# Cocoapods

## 배경

옛날 글들을 봤다.  
초기에 ios를 개발할 때에는 외부 라이브러리 연동은 파일을 직접 라이브러리에 임포트하는 형식으로 사용되었다고 한다. 😖

점차 라이브러리가 많아질 수록 복잡해졌고, 따라서 의존성을 관리하는 패키지 매니저가 필요하게 됐다.

> 그것이 바로 `cocoapods`가 범용화된 이유이다.

루비 언어로 만들어진 코코아팟은 Swift, Objective-C 언어 환경 프로젝트의 의존성을 관리해준다.

 마치 안드로이드의 `gradle`의 역할을 해주며, 현재는 `XCode`와 개발 시 많이 이용되는 관리 모듈이라 생각하면 편하다.

## 설치

```bash
brew install cocoapods
```

## Podfile

가져올 Pod의 버전을 명시해줄 수 있다.  

+ **`pod ''myFramework', '0.0.1'`** 
 `v0.0.1`
+ **`pod 'myFramework' , '= 0.0.1'`** 
 `v0.0.1`
+ **`pod 'myFramework' , '>= 0.0.1'`** 
 `v0.0.1` 이상
+ **`pod 'myFramework' , '~> 0.1.2'`** 
 `v0.1.2` 이상 ~ `0.2 미만`

## Podfile.lock

pod들의 버전을 계속 추적 및 기록하고 유지하는 역할을 맡는다.  
이때, `CHECKSUM`이라는 것이 붙는다. 이것은 `Podfile.lock`의 유일성을 보증해주는 해시값이다.

`pod` 버전에 변화가 있다면 이 해시값 역시 변하며 최신 상태임을 나타내므로 항상 커밋을 같이 해주어야 한다.

## 커맨드 

### pod install

`pod`을 처음에 세팅하기 위해 설치하는 용도로 사용하지만, `pod`의 추가, 수정, 삭제를 할 때 모두 사용한다.

`pod install`을 실행할 시 `Podfile.lock`에 지정된 버전만 설치한다. `Podfile.lock`에 리스트되지 않은 `pod`들은 `Podfile`에서 명시된 버전 조건으로 검색하여 설치한다.

### pod update

 해당 팟의 업데이트 버전이 있는지를 검색한다.  
 `Podfile.lock`을 참조하지 않고 최신으로 업데이트한다.
(단, Podfile의 버전 조건 범위 안에서)

## pod outdated

이름에 쓰여져 있는 느낌 그대로다.  
Podfile.lock에 리스트된 것보다 새로운 버전을 가진 모든 팟을 나열한다. (단, Podfile의 버전 조건 범위 안에서)

## pod repo update

/Users/[[사용자명]]/.cocoapods/repos 에 있는 모든 podspec 파일을 최신으로 업데이트한다.  

podspec 파일에는 해당 pod 의 주소 등 중요한 정보들이 담겨있다. 대개 추가한 라이브러리의 `podspec`이 업데이트되지 않은 경우 이 명령어를 통해 해결 가능하다.

## pod deintegrate

pod을 삭제하는 명령어이다.

## pod cache clean --all

캐시를 모두 지우는 명령어이다.

---

## Trouble shooting

### 프로젝트 시 코코아팟에서 문제가 발생할 때

`Podfile.lock`, `Pods`, `[[프로젝트]].xcworkspace`를 삭제하고 `pod install`을 실행한다.

```bash
sudo rm Podfile.lock
sudo rm -r [[프로젝트]].xcworkspace
sudo rm -r Pods
pod install
```

### 코코아팟 캐시를 제거하고 싶을 때

이번에 내 문제를 해결한 코드이다.

```bash
 rm -rf ~/Library/Caches/CocoaPods; 
 rm -rf Pods; 
 rm -rf ~/Library/Developer/Xcode/DerivedData/*; 
 
 pod deintegrate; 
 pod setup; 
 pod install;
```