# Pressable

버튼을 위해 `TouchableOpacity` 등과 같은 컴포넌트보다 최근에 만들어진 컴포넌트이다.

## 분기처리를 하는 이유

`Pressable`을 할 때 보통 다음과 같은 코드를 자주 접하게 된다.

```jsx
<Pressable
  style={({pressed}) => [
    styles.wrapper,
    Platform.OS === 'ios' && pressed && {opacity: 0.5},
  ]}
  android_ripple={{color: '#ffffff'}}>
  <Text style={styles.text}>CustomButton</Text>
</Pressable>
```

이유는, IOS와 Android의 권장하는 UI가 다르기 때문이다.

iOS와 Android에서 터치 이벤트는 처리 방식이 다르다. iOS에서는 터치 이벤트가 발생할 때 버튼이 눌러졌다는 피드백을 주기 위해 버튼의 투명도를 일시적으로 낮추는 것이 일반적이다. 반면 Android에서는 터치 이벤트가 발생할 때 버튼의 배경색이 변경되는 것이 일반적이다.

위 코드에서는 `Platform.OS`를 사용하여 현재 플랫폼이 iOS인지 확인하고, `pressed` 값이 `true`일 때 버튼의 투명도를 0.5로 설정한다. 이를 통해 iOS에서의 터치 이벤트를 처리하는 방식을 따를 수 있다. 

따라서 iOS에서는 Pressable이 버튼을 누르는 동작에 대해 투명도를 조절하는 것이 일반적이고, Android에서는 Pressable이 배경색을 변경하는 것이 일반적이기에 이러한 코드로 대개 진행한다.