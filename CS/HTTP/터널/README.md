# 터널

단순히 `HTTP` 통신을 전달하기만 하는 특별한 Proxy이다.

두 커넥션 사이에 위치한 터널은, `raw data`를 그대로 전달해주기만 하는 `HTTP Application`이다. 주로 `non HTTP data`를 하나 이상의 연결을 통해 연결을 보장하기 위해 사용한다.

`암호화된 SSL 트래픽`이 존재한다고 가정하자. 이때 터널은 `HTTP Connection`으로 전송하여, 웹 트래픽만 허용하는 사내 방화벽을 통과시키는 용도로 사용한다.

`HTTP/SSL` 터널은

1. `HTTP 요청`을 받아들인다.
2. 이후 목적지의 주소, 포트번호와 커넥션을 맺는다.
3. 암호화된 `SSL` 트래픽을 `HTTP Channel`을 통해 목적지 서버로 전송한다.

![image](https://user-images.githubusercontent.com/78713176/211289645-4a60646f-94f5-48bc-81c7-5928b3181f56.png)
