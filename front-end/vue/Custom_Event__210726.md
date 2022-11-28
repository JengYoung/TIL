# **커스텀 이벤트**

> 컴포넌트 및 props와는 달리, 이벤트는 자동 대소문자 변환을 제공하지 않습니다.

즉, 뭔가 HTML 파싱에서 발생하는 것과 별도로 하면 된다.  
(대략적으로, 아마 자바스크립트에서 이벤트 속성명을 찾기 때문이라 짐작)

따라서 대소문자를 혼용하는 대신에 emit할 정확한 이벤트 이름을 작성하는 것이 권장.

다만, DOM 템플릿의 **v-on 이벤트리스너는 항상 자동으로 소문자 변환되기 때문에** v-on:myEvent 는 자동으로 v-on:myevent로 변환

따라서 `kebab-case`를 권장한다.

## **`v-model` 커스터마이징**

v-model 을 사용하는 컴포넌트는

- default value: `prop`
- default event: `input`
  로 사용

따라서 `value` 속성을 다른 용도로 사용하는 경우는 (ex: `checkbox`) `model` 옵션 사용

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

다음처럼, 다른 타입으로 사용했을 때에는 `model`을 이용하여 value와 event의 설정값을 바꿔준다.

```
<base-checkbox v-model="lovingVue"></base-checkbox>
```

결과적으로 해당 값은 `checked`값으로 전달되며 `change` event시 발생한다.

## **`Native` 이벤트 컴포넌트 바인딩**

`Root element`에서의 이벤트를 직접 감지할 수 있다.
이는 `v-on:[이벤트].native="[callback]"`으로 할 수 있다!

다만 결국에는 직접 감지하는 것이 의도한 대로 동작하지 않는 경우가 있다.
대표적인 예로, `label`이 `input`의 루트 엘리먼트일 경우이다. 이는 부모가 가진 이벤트리스너가 자식과 다르기 때문이다.

```
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

### **해결방법 - `$listeners` 사용**

이 프로퍼티는 부모 엘리먼트의 리스너를 자식에게 전달한다.  
즉, 부모 엘리먼트의 모든 리스너를 추가하고,  
이를 오버라이드한다면 굳이 `.native`가 없더라도 부모의 이벤트를 감지할 수 있는 것이다!

```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        // overriding previous event
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

## **`.sync`**

양방향 바인딩을 가능케한다. 즉 자식 컴포넌트가 부모 컴포넌트를 변경시키게 한다.

이는 결국, 어디서 변경이 발생했는지가 애매해지기 때문에 혼동을 줄 수 있다.
따라서 `update:myPropName`과 같은 패턴을 쓰라고 권장하고 있다.

```
// 이렇게 이벤트를 상위 컴포넌트에 올려버리면
this.$emit('update:title', newTitle)

// 이를 여기서 다음과 같이 바꾼다고 표현할 수 있는 것이다.
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

물론 이해가 된다만, 가독성이 썩 좋지는 않다. 로직이 복잡하기 때문이다.  
이럴때 쓸 수 있는 것이 `.sync`이다.

다음과 같이 깔끔하게 해결할 수 있다.

```
<text-document v-bind:title.sync="doc.title"></text-document>
```

이때 주의할 것은 **`.sync`와 `v-bind`가 함께 동작하지 않는다는 것이다. 오로지 식이 아닌 속성이름만 쓸 수 있다.**

또한, 여러 개의 `props`를 전달하는 데 유용하다.

```
// 아까는 doc의 속성만 전달했다면, 지금은 자체를 전달한다.
<text-document v-bind.sync="doc"></text-document>
```
