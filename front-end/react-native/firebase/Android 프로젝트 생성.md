# 프로젝트 만들기

## 디버그 서명 인증서

```bash
keytool -J-Duser.language=en -list -v -alias androiddebugkey -keystore ./android/app/debug.keystore
```

이후 여기서 생성된 `SHA-1` 키를 입력한다.

## google-services.json

해당 파일은 다운로드 후 프로젝트의 `android/app`에 저장하면 된다.

<img width="209" alt="image" src="https://user-images.githubusercontent.com/78713176/228743368-0860cd0c-cd4e-4199-a1d6-e19ec39a6715.png">
