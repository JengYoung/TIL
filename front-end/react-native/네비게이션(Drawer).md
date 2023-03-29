# Navigation(drawer)

## installation

```bash
# @react-navigation/drawer: 네비게이터를 불러오기 위한 라이브러리이다.
# react-native-gesture-handler: 사용자 제스처를 인식하기 위해 내부적으로 사용
# react-native-reanimated 리액트 네이티브 내장 애니메이션 효과보다 더 개선된 성능으로 구현한다.

yarn add @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

## 사용법

사용법은 `Stack`과 거의 비슷하다.  
코드로 보여주는 게 훨씬 더 편할 것 같아 코드를 남긴다.

```jsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerHomeScreen from './screens/DrawerHomeScreen';
import SettingScreen from './screens/SettingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const LeftSidebar = ({onPress}) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Text>Left</Text>
//     </TouchableOpacity>
//   );
// };

// const RightSidebar = ({onPress}) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Text>Right</Text>
//     </TouchableOpacity>
//   );
// };

// const HeaderTitle = ({children, route}) => {
//   return (
//     <View>
//       <Text>{route.params.id}</Text>
//       <Text>{children}</Text>
//     </View>
//   );
// };

const HeaderLeft = () => <Text>Left</Text>;

const DrawerContent = ({navigation}) => (
  <SafeAreaView>
    <Text>
      <Button onPress={() => navigation.closeDrawer()} title="닫기" />
    </Text>
  </SafeAreaView>
);

export default function App() {
  const Drawer = createDrawerNavigator();
  const HeaderLeft = () => <Text>Left</Text>;

  const DrawerContent = ({navigation}) => (
    <SafeAreaView>
      <Text>
        <Button onPress={() => navigation.closeDrawer()} title="닫기" />
      </Text>
    </SafeAreaView>
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="left"
        backBehavior="history"
        screenOptions={{
          drawerActiveBackgroundColor: '#fb8c00',
          drawerActiveTintColor: 'white',
        }}
        drawerContent={({navigation}) => DrawerContent({navigation})}>
        <Drawer.Screen
          name="Home"
          component={({navigation}) => DrawerHomeScreen({navigation})}
          options={{title: '홈', headerShown: false}}
        />
        <Drawer.Screen
          name="Setting"
          component={({navigation}) => SettingScreen({navigation})}
          options={{
            title: '설정',
            headerLeft: () => HeaderLeft(),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```