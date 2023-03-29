# Navigation

> 이 글은 **"react-native": "0.71.4"** 환경에서 작성되었습니다.

## installation


```bash
yarn add @react-navigation/native

yarn add react-native-screens react-native-safe-area-context
```

## 원리

기본적으로 웹에서는 `History API`로 stack 구조를 통해 웹 페이지 네비게이션을 관리한다.  
`RN`에서는 `native stack navigator`가 존재한다. 이를 설치하자.


```bash
yarn add @react-navigation/native-stack
```

## 화면 이동하기

일단 스택 내비게이터에는 다른 페이지로 이동할 때 다음 2가지가 있다.

+ `navigate`: 화면전환 효과 없음, 페이지를 스택에 추가하지 않고 이동함. (`replace`와 유사)
+ `push`: 화면전환 효과 있음, 페이지를 스택에 추가함.

## 뒤로 가기

+ `popToTop`: 가장 맨 처음 페이지로 이동하고 싶을 때 사용한다.
+ `pop`: 뒤로 갈 때 사용한다.

## 기타 - 레이아웃 및 스타일 지원

다음과 같이 헤더에 대한 것들을 설정해줄 수 있다.

```jsx
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // 초기 라우트
        initialRouteName="Home"
        // 스크린에서 헤더 보여주기 여부
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // 타이틀 설정(우선순위 높음)
            title: '홈🙆🏻🙆🏻‍♀️',
            // 헤더 스타일 설정
            headerStyle: {
              backgroundColor: '#00bbaa',
            },
            // 헤더 타이틀 색 설정
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({route}) => ({
            title: `상세 정보 - ${route.params.id} 🥰`,
            // 헤더 타이틀 설정(우선순위 낮음)
            headerTitle: ({children}) => HeaderTitle({route, children}),
            // 헤더의 왼쪽 설정
            headerLeft: LeftSidebar,
            // 헤더의 오른쪽 설정
            headerRight: RightSidebar,
            // 헤더에서 뒤로가기 보여줄지 여부 설정
            headerBackVisible: false,
          })}
        />

        <Stack.Screen
          name="Headerless"
          component={HeaderlessScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```