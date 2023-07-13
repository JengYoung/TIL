# path

생각보다 `path` 태그를 그릴 떼가 많음에도 불구하고, 간혹 `attribute`들이 헷갈려 적는다.

## 특징

`path`는 사실상 d 속성을 토대로 거의 모든 것을 제어한다. 얼핏 듣기로는 쉬워보이지만, 굉장히 중요하고, 이해가 필요하다.  
먼저 일단 `path`가 왜 필요한지를 생각해보자. 왜 선을 그리는 것이 필요할까?  
실제로 직선으로 이루어진 도형은 `polylines`로 그릴 수 있다고 한다. 그럼에도 불구하고, `path`를 그리는 이유는 간결함 때문이다. (그렇다고 직접 에디터로 ~생노가다~를 할 필요는 없겠다.)

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 10,30
           A 20,20 0,0,1 50,30
           A 20,20 0,0,1 90,30
           Q 90,60 50,90
           Q 10,60 10,30 z" />
</svg>
```

## d

`path`에 있어 가장 핵심적인 속성이다.
기본 값은 `''`이며, `path`의 경로 모양을 정의할 수 있다.  
또한 `Animatable`하다고 한다.

### M [x y] (= m [dx dy])

(x, y)로 이동할 때 사용하는 용어이다. 즉 첫 시작점 등을 제어할 때 유용하다.

```html
<path d="M10 10"/>
```

### L [x y] (= l [dx dy])

2개의 파라미터를 받고, 현재 위치에서 새 위치로 선을 긋는 명령어이다.

### H [x] (= h [dx])

가로선을 그리는 축약 명령어이다.

### V [y] (= v [dy])

세로선을 그리는 축약 명령어이다.

### Z

`path`의 상태를 마무리하는 명령어이다.

```html
<path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
```

### 베지어 곡선

자, 이제부터 슬슬 골치 아파진다.  
베지어 곡선 중에는 2차, 3차 베지어 곡선이 있다.

2차는 `Q`로, 3차는 `C`로 제어한다.

#### Q [x1 y1, x y] (= q [dx1 dy1, dx dy])

2차 베지어 곡선은 하나의 제어점이 시작점과 끝점의 방향을 모두 결정한다.  
이 명령어는 매개변수로 제어점과 곡선의 끝점 2개를 받는다.

> 흐음... 생각보다 어렵다. 도대체 어떤 의미일까?

[다음 블로그](https://blog.coderifleman.com/2017/03/19/bezier-curves-for-frontend-engineer-3/)를 통해 꽤나 정답에 가까운 답을 찾은 것 같다.

결국 핵심은 '제어점'이 뭐냐는 거다.  
일단 다음 코드를 보자.

```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>
```

이는 다음과 같은 결과가 나온다.

![result](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths/shortcut_quadratic_b%C3%A9zier_with_grid.png)

여기서 제어점이란 앞에 있는 `x1 y1` 포인트다.  
여기서, 시작점에서 제어점까지의 벡터가 존재할 것이다. 그리고 제어점은 끝점으로의 벡터가 존재한다.  
이때, 이러한 두 벡터에 따라 시작점 - 제어점으로부터 움직이는 선이 있다고 가정하자.

그러면 이 선을 이동하는 점이 존재할 건데, 그 점이 이동한 경로의 결과가 바로 이 곡선인 것이다!  
말로 풀어서 설명하니 어려운데, 이는 다음과 같다.

![결과](https://blog.coderifleman.com/images/bezier-curves/bezier-curve.02.gif)


####  T [x y] (= t [dx dy])

#### C x1 y1, x2 y2, x y (= c dx1 dy1, dx2 dy2, dx dy)

3차 베지어 곡선은 선을 잇는 두 점에 하나씩 제어점을 가지고 있다. 그러므로 3차 베지에 곡선을 그리려면 총 세 개의 좌표가 필요하다.

쉽게 말하자면 선이 하나 더 추가된 것이다. 그리고 이 선을 따라 또 움직이는 베지에 곡선이 `nesting`된 것이다. 그래서 3차 베지에 곡선인 것이다.

![결과 - 3차 베지에 곡선](https://blog.coderifleman.com/images/bezier-curves/bezier-curve.03.gif)

####  S x2 y2, x y (= s dx2 dy2, dx dy)

####  A rx ry x축-회전각 큰-호-플래그 쓸기-방향-플래그 x y (= a rx ry x축-회전각 큰-호-플래그 쓸기-방향-플래그 dx dy)

## pathLength

작성자가 경로의 총 길이를 사용자 단위로 지정할 수 있다고 한다.
숫자 타입의 속성 값이 들어가며, 기본값은 없다. (`undefined`)  
이 역시 `Animatable`하다고 한다.

# 참고자료

+ [중학생도 알 수 있는 베지에 곡선(Bezier Curves)](https://blog.coderifleman.com/2016/12/30/bezier-curves/)
+ [프런트엔드 엔지니어를 위한 베지에 곡선(Bezier Curves) - 1편](https://blog.coderifleman.com/2017/01/02/bezier-curves-for-frontend-engineer-1/)
+ [프런트엔드 엔지니어를 위한 베지에 곡선(Bezier Curves) - 3편](https://blog.coderifleman.com/2017/03/19/bezier-curves-for-frontend-engineer-3/)