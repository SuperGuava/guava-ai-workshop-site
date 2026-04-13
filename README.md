# 구아바의 AI 공방

정적 랜딩페이지 결과물입니다.

## 파일 구성
- `index.html`: 메인 페이지
- `styles.css`: 전체 스타일
- `script.js`: 탭 전환 및 상담 문구 복사 기능
- `site.webmanifest`: PWA/브라우저 메타 설정
- `netlify.toml`: Netlify 배포 설정
- `vercel.json`: Vercel 배포 설정
- `.nojekyll`: GitHub Pages용 Jekyll 비활성화
- `github-pages-workflow.yml.example`: GitHub Pages Actions 예시
- `assets/`: SVG 일러스트 자산
- `verify-site.mjs`: 배포 전 스모크 테스트

## 로컬 확인
브라우저에서 `index.html`을 바로 열어도 됩니다.

## 검증
다음 명령으로 기본 배포 요소가 있는지 확인할 수 있습니다.

```bash
node guava-ai-workshop-site/verify-site.mjs
```

## 배포 가이드

### Netlify
- 새 사이트를 만들고 `guava-ai-workshop-site` 폴더를 업로드하면 됩니다.
- 별도 빌드 명령은 필요 없습니다.
- 퍼블리시 디렉터리는 루트(`.`)입니다.

### Vercel
- 정적 프로젝트로 가져오면 됩니다.
- 별도 프레임워크 프리셋 없이 배포 가능합니다.
- `vercel.json`이 기본 헤더와 URL 정리를 처리합니다.

### GitHub Pages
- `.nojekyll` 파일이 포함되어 있어 정적 파일 그대로 배포할 수 있습니다.
- Actions 배포가 필요하면 `github-pages-workflow.yml.example`를
  `.github/workflows/deploy-guava-site.yml`로 옮겨 사용하면 됩니다.
- 워크플로는 `guava-ai-workshop-site` 폴더를 바로 배포 대상으로 잡습니다.
