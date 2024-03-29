# Blog App

- Next.js와 TypeScript를 이용하여 Blog App 구현
- Demo : [Blog App](https://blog-app-lani.vercel.app/)

## 기능([상세](https://blog-app-lani.vercel.app/posts/introduce-blog-app))

- Next.js 14 버전을 이용하여 app 폴더 하위에서 파일 시스템 기반 라우터를 구성
- Firebase의 Firestore Database 이용하여 Posts 제공 및 댓글 구현
- Home에서 Posts를 최신순/오래된순/이름순 정렬하여 제공
- Posts 메뉴에서 Tag별 게시물 제공
- 가독성을 높이기 위해 Markdown Viewer를 이용하여 상세 게시글 제공
- 상세 게시글에서 IntersectionObserver을 이용하여 TOC(Table of contents) 제공
- 상세 게시글에서 이전/다음 게시글로 이동 구현
- 페이지 별로 적절한 metadata를 제공하여 SEO 최적화

## 사용 기술 및 라이브러리

### 프레임워크

- Next.js (v14.0.3)

### 기술

- TailwindCSS (v3.3.5)
- TypeScript (v5)
- React (v18)

### 라이브러리

- react-markdown (v9.0.1)
- remark-gfm (v4.0.0)
- react-syntax-highlighter (v15.5.0)
- react-icons (v4.12.0)
- nodemailer (v6.9.7)
- yup(v1.3.2)

### 클라우드 서비스

- Firebase (v10.8.1)