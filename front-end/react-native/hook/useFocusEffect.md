# useFocusEffect

useFocusEffect는 React Navigation에서 제공하는 Hook 중 하나로, 화면이 Focus 되었을 때 실행되는 함수를 지정할 수 있다. 

이 Hook을 사용하면, 화면이 Focus 되었을 때 특정 동작을 수행하거나 상태를 업데이트할 수 있다. 

일반적으로 useEffect와 유사하지만, 화면이 Focus 되었을 때만 실행된다는 점이 차이점이다.

예를 들어, useFocusEffect를 사용하여 특정 화면에 진입할 때마다 API를 호출하거나, 화면이 Focus 되었을 때만 특정 애니메이션을 실행하는 등의 작업을 할 수 있다.

## 사용 이유

기본적으로 화면을 띄우는 것은, 그 화면이 사라지는 게 아니라 그 화면 위에 새로운 화면을 쌓아서 보여주는 것이다. 따라서 unmount가 되지 않는다.

이럴 때에는 `Focus`를 사용하는 것이다. 그러면 화면이 마운트와 관계없이 Focus 되거나 되지 않을 때마다 호출된다.

이때 주의할 것이 있다. `useCallback`으로 래핑한 함수를 넣어야 한다.

```jsx

function HomeScreen({navigation}) {
  useFocusEffect(
    useCallback(() => {
      console.log('focus mounted');
      return () => {
        console.log('focus unmounted');
      };
    }, []),
  );
  useEffect(() => {
    console.log('---------mounted');
    return () => {
      console.log('---------unmounted');
    };
  });
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="상세보기"
        onPress={() => navigation.push('Detail', {id: 1})}
      />
    </View>
  );
}
```