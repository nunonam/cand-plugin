# TROUBLE SHOOTING

### Cannot read properties of null (reading 'useState')  
- nextjs 버전을 13.2.4 로 해야함


# ZOOM WEBSDK
### gallery view
- console에서 아래값이 true가 되어야 함
```
typeof SharedArrayBuffer === 'function' --> true
```
```
crossOriginIsolated --> true
```
##### 1. Cross origin isolation
- next.config.js
```
headers: async () => {
  return [
    {
      source: '/zoom',
      headers: [
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
      ],
    },
  ]
}
```

##### 2. Chrome Origin Trials
- https://developer.chrome.com/origintrials/#/trials/active > SharedArrayBuffers in non-isolated pages on Desktop platforms 등록
- token을 header meta tag에 추가
```
<meta httpEquiv="origin-trial" content="Ajwp8BrPKY3nLguXLsMgkBTI9PYxwQJEc+YOePRhumqaf9s82nZizHnhXP3lWFryvE67ejntEoojg5Nx75eOnAwAAAB9eyJvcmlnaW4iOiJodHRwczovL2NhbmQtcGx1Z2luLTA0Yzc2YTAxZmMyMy5oZXJva3VhcHAuY29tOjQ0MyIsImZlYXR1cmUiOiJVbnJlc3RyaWN0ZWRTaGFyZWRBcnJheUJ1ZmZlciIsImV4cGlyeSI6MTcwOTg1NTk5OX0=" />
```
