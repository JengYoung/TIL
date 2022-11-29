# AsyncStorage

네이티브 환경에서의 `LocalStorage`라고 생각하면 된다.
사용방법도 거의 동일할 정도로 비슷하다.

## 적용

사실 너무 간단한 친구라 쓰지 않을까 싶었는데 이것 때문에 글을 썼다.  

이 패키지는 현재 `@react-native-community`에서 유지보수하면서 라이브러리로 분리되었다고 한다. 따라서 따로 설치해야 한다.

```bash
yarn add @react-native-community/async-storage
```

이후에는 불러오면 끝이다.

## 사용법

여기서는 프로미스를 통해 `setItem`과 `getItem`을 가져와야 한다.

다음은 투두리스트의 일정을 저장하는 예제 코드다.

```js
import AsyncStorage from '@react-native-community/async-storage';

const key = 'todos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);

      if (!rawTodos) {
        throw new Error('No saved todos');
      }

      const savedTodos = JSON.parse(rawTodos);
      return savedTodos;
    } catch (e) {
      throw new Error('Failed to load todos');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save todos');
    }
  },
};

export default todosStorage;

```

## 용량 제한

네이티브 환경에서의 스토리지는 제각각이다.

+ `ios`는 용량에 대해 규정이 없지만,
+ `android`는 약 10MB로 알려져 있다.

### android 환경 용량 제한 해제

이는 `gradle.properties`에서 따로 적용이 가능하다.

#### android/gradle.properties
```properties
AsyncStorage_db_size_in_MB=10
```