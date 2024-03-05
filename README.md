# Blog App

- Next.js와 TypeScript를 이용하여 Blog App 구현
- Demo : [Blog App](https://blog-app-lani.vercel.app/)

## 기능

- Next.js 13 버전을 이용하여 app 폴더 하위에서 파일 시스템 기반 라우터를 구성
- Home에서 Posts를 최신순/오래된순/이름순 정렬하여 제공
- Posts 메뉴에서 Tag별 게시물 제공
- 가독성을 높이기 위해 Markdown Viewer를 이용하여 상세 게시글 제공
- 상세 게시글에서 이전/다음 게시글로 이동 구현
- Contact 메뉴에서 이메일 전송 기능 구현
- 페이지 별로 적절한 metadata를 제공하여 SEO 최적화

## 사용 기술 및 라이브러리

### 프레임워크

- Next.js (v14.0.3)

### 기술

- TailwindCSS (v3.3.5)
- TypeScript (v5)
- React (v18)

### 라이브러리

- react-multi-carousel (v2.8.4)
- react-markdown (v9.0.1)
- remark-gfm (v4.0.0)
- react-syntax-highlighter (v15.5.0)
- react-icons (v4.12.0)
- nodemailer (v6.9.7)
- yup(v1.3.2)

## 개선사항

- loading
- 게시글 카테고리 1개 → 여러개 작성 가능하도록 개선
- 댓글
