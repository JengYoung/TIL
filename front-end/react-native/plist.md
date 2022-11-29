# plist

iOS앱의 프로퍼티 리스트 파일이다.  
앱 이름, 아이콘, 버전 등 앱에서 필요한 설정값을 가지고 있다.

기본적으로 `react-native`에서는 `info.plist`를 제공하고 있는데, 이는 바이너리 형태가 아닌 `xml` 형태로 제공하고 있다.

---

## 사용법

### key

key값은 애플리케이션을 불러올 때 사용하는 값이다.

### string

`string` 값은 실제로 사용되고, 출력될 값이다.

이번에 `react-native-vector-icons`를 사용하려 했다.
이때 필요한 것은, `plist`의 내용을 바꿔야만 했다.


```xml
	<key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
	<key>UIAppFonts</key>
	<array>
		<string>MaterialIcons.ttf</string>
	</array>
</dict>
</plist>
```

이처럼, 앱에 대한 이름과, 아이콘 등 필요한 값들을 설정해줄 수 있다.