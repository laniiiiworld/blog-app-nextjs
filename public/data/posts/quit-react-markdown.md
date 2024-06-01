markdown 기반의 블로그를 만들며 markdown을 예쁘게 보여주기 위해 react-markdown을 사용했다. react-markdown은 CommonMark 문법을 따르지만, XSS공격으로부터 안전하기 위하여 일반적으로 HTML을 무시하기 때문에 커스터마이징이 필요하다.\
react-markdown을 설치할 때는 취소선, 테이블 등도 올바르게 렌더링할 수 있도록 remark-gfm을 같이 설치하는 것이 좋다.

```bash
$ yarn add react-markdown remark-gfm
```

## 방법

커스터마이징 하는 방법은 아래 코드와 같이 components 속성에 알맞는 {key: value} 값을 넣어주면 된다.
여러 항목을 커스터마이징 한다면, {key1: value1, key2: value2, ...}와 같이 작성할 수 있다.

```tsx
import remarkGfm from 'remark-gfm';

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    'html에서 사용하는 태그 명': '변경사항을 작성한 함수',
  }}
  ...
>
  {content}
</ReactMarkdown>
```

### 링크를 새 창에서 열기

링크를 새 창에서 열기위해서는 target 속성을 "\_blank"로 지정하여 반환하면 된다.

```tsx
<ReactMarkdown
  ...
  components={{
    a: ({ href, children }) => (
      <a href={href} target='_blank'>
        {children}
      </a>
    ),
    ...
  }}
>
  {content}
</ReactMarkdown>
```

### 줄바꿈

#### 일반적인 줄바꿈

일반적으로 마크다운에서 줄바꿈을 원한다면 "br태그"를 사용할 수 있다. 하지만 react-markdown에서 "br태그"는 text로 출력된다.\
줄바꿈을 원한다면 2번째 줄처럼 **"역 슬래시(\\)"를 문장 끝**에 붙여주면 된다.

```text
1. 나비야 나비야 이리 날아 오너라<br />
2. 노랑나비 흰 나비 춤을 추며 오너라\
3. 봄바람에 꽃잎도 방긋방긋 웃으며\ 참새도 짹짹짹 노래 하며 춤춘다
```

나비야 나비야 이리 날아 오너라<br />
노랑나비 흰 나비 춤을 추며 오너라\
봄바람에 꽃잎도 방긋방긋 웃으며\ 참새도 짹짹짹 노래 하며 춤춘다

#### 테이블 안에서의 줄바꿈

테이블 안에서 줄바꿈을 원할 경우에는 커스터마이징이 필요하다. 아래 테이블이 있다고 가정하자.

| 가  | 나  |
| :-: | :-: |
|  A  | BC  |
|  D  | EF  |

이 경우 "나" 컬럼의 "EF"를 "E"와 "F"로 하나의 셀 안에서 줄바꿈하고 싶다면, td를 커스터마이징하는 코드를 추가할 수 있다.\
주의할 점은 "...rest"를 명시해줘야 마크다운에서 설정한 정렬이 정상 작동한다.

```tsx
<ReactMarkdown
  ...
  components={{
    td: ({ children, ...rest }) => {
      if (typeof children === 'string') {
        children = children.split(/<br[ ]?\/>/g);
      }
      if (Array.isArray(children)) {
        children = children.map((str, index) => (str.match(/<br[ ]?\/>/g) ? <br key={index} /> : str));
      }
      return <td {...rest}>{children}</td>;
    },
    ...
  }}
>
  {content}
</ReactMarkdown>
```

코드를 추가하고 테이블 안에 "br태그"를 작성해주면 셀 안에서 줄바꿈이 되는 것을 확인할 수 있다.

```text
| 가  |   나    |
| :-: | :-----: |
|  A  |   BC    |
|  D  | E<br/>F |
```

| 가  |   나    |
| :-: | :-----: |
|  A  |   BC    |
|  D  | E<br/>F |

### 코드 블럭과 문법 강조

마크다운에서 코드 블럭은 "백틱(`)"을 3개 이어 붙인 "```"로 감싸면 만들 수 있다.\
react-markdown만을 사용하면 코드 블럭을 구분할 수는 있지만 문법이 강조되지 않는다.\
코드 블럭의 문법 강조를 위해 'react-syntax-highlighter'도 설치하여 같이 사용하는 것이 좋다.

```bash
$ yarn add react-syntax-highlighter
```

이후 [여기](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)를 참고하여 원하는 디자인을 골라 import 후, \
import한 스타일과 SyntaxHighlighter 컴포넌트의 'style' 속성을 연결해주면 된다.

```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

<ReactMarkdown
  ...
  components={{
    code: (props) => {
      const { children, className, node, ...rest } = props;
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter //
          {...rest}
          PreTag='div'
          language={match[1]}
          style={dracula}
          ref={null}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
    ...
  }}
>
  {content}
</ReactMarkdown>
```

#### inline 코드 꾸며주기

`const match = /language-(\w+)/.exec(className || '');`로 match되지 않는 코드는 inline 코드이다.\
한 가지 주의할 점은 위에 코드를 그대로 사용한다면, inline 스타일이 적용되지 않도록 **코드 블럭 작성시 language를 반드시 기재**해줘야 한다.\
inline 코드는 다음과 같이 className을 수정하여 좀 더 꾸며줄 수 있다. 스타일은 tailwindCSS를 이용하여 꾸며주었다.

```tsx
<code className='bg-stone-300 text-stone-800 rounded-md before:content-none after:content-none py-1 px-2' {...rest}>
  {children}
</code>
```

### rehype-raw plugin

상황에 따라 rehype-raw 플러그인을 사용하는 방법도 있다. 이 플러그인은 다시 HTML을 지원하도록 바꾸어 주지만, XSS공격에 취약해지므로 사용전에 신중해야 한다.\
rehype-raw 플러그인을 사용하면 "br태그"를 사용하여 줄바꿈 할 수 있다.

```tsx
import rehypeRaw from 'rehype-raw';

<ReactMarkdown
  ...
  rehypePlugins={[rehypeRaw]}
  components={...}
>
  {content}
</ReactMarkdown>;
```

## References

- [CommonMark Spec](https://spec.commonmark.org/0.30/#html-blocks)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [rehype-raw](https://github.com/rehypejs/rehype-react)
- [line-break doesn't work in table header - remark-gfm issue](https://github.com/remarkjs/remark-gfm/issues/40)
- [React Markdown Custom Renderer with Tailwind CSS - MozzLog](https://www.mozzlog.com/blog/react-markdown-custom-renderer)
