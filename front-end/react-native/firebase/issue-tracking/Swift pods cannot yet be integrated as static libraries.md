# 배경

`npx pod-install`을 하려던 도중 다음과 같은 오류가 발생했다.

> [!] The following Swift pods cannot yet be integrated as static libraries:

The Swift pod `FirebaseStorage` depends upon `FirebaseAppCheckInterop`, `FirebaseAuthInterop`, `FirebaseCore`, `FirebaseCoreExtension`, and `GTMSessionFetcher`, which do not define modules. To opt into those targets generating module maps (which is necessary to import them from Swift when building as static libraries), you may set `use_modular_headers!` globally in your Podfile, or specify `:modular_headers => true` for particular dependencies.

## 해결 방법

다른 글들 다 무시하고, 공식문서만 보자.

> [공식문서](https://rnfirebase.io/)

공식문서의 글에 따르면, 현재(23.03.30) 기준, React Native Firebase는 설치 과정에 있어서 `Flipper`와 호환이 불가능하다고 언급하고 있다.

따라서 이를 해결하기 위해서는, 다음과 같은 번거로운 절차가 필요하다.

### '#import "AppDelegate.h"' 코드 직후

```m
#import <Firebase.h>
```

### didFinishLaunchingWithOptions 메서드 최상단

```m
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Add me --- \/
  [FIRApp configure];
  // Add me --- /\
  // ...
}
```

### Cocoapods에서 사용할 때

```bash
target 'GalleryChuu' do
  config = use_native_modules!
  # NOTE: see this. https://rnfirebase.io/
  use_frameworks! :linkage => :static
  # NOTE: see this. https://rnfirebase.io/
  # right after `use_frameworks! :linkage => :static`
  $RNFirebaseAsStaticFramework = true

  # ...
```

이후 Flipper을 꺼준다.

```bash

  use_react_native!(
    :path => config[:reactNativePath],
    # Hermes is now enabled by default. Disable by setting this flag to false.
    # Upcoming versions of React Native may rely on get_default_flags(), but
    # we make it explicit here to aid in the React Native upgrade process.
    :hermes_enabled => flags[:hermes_enabled],
    :fabric_enabled => flags[:fabric_enabled],
    # Enables Flipper.
    #
    # Note that if you have use_frameworks! enabled, Flipper will not work and
    # you should disable the next line.
    # NOTE: see this. https://rnfirebase.io/
    # :flipper_configuration => flipper_config,
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
```

## 설치

다시 돌아와서, 루트에서 `npx pod-install`을 해준다.

## 결과

정상 동작한다!