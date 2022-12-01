## toBe

`toBe` 메서드는 동등성을 비교하는 데 사용한다.
이때, `toBe`는 객체를 비교할 때 완전히 동일한 메모리에서의 객체인지를 확인한다.

```js
describe('toBe', () => {
  it("두 객체의 비교결과는 참조값이 다르므로 false여야 한다.", () => {
    const objectOne = {
        propertyOne: str,
        propertyTwo: num    
    }

    const objectTwo = {
        propertyOne: str,
        propertyTwo: num    
    }

    expect(objectOne).not.toBe(objectTwo) // true;
  })
})
```

## toEqual

`toEqual` 역시 동등성을 비교하는ㄷ 