블로그를 만들면서 게시글을 읽을 때마다 스크롤을 위로 올리는게 불편하여 TOP버튼을 만들기로 결정했다. 

## 어떻게 동작하도록 구현할까?
먼저 생각했던 방법은 다음 3가지이다.
1. 항상 보여준다.
2. 특정 위치 이후로 스크롤되었을 때 TOP 버튼을 화면에 표시한다.
3. 가시성을 toggling하여 스크롤 위치에 따라 TOP 버튼을 표시하거나 숨긴다.

세가지 방법 중 3번과 같이 구현하면 기능은 간단하지만, 동작에 재미를 더할 수 있겠다고 생각했다. 사용자가 글을 읽을 때는 TOP버튼을 숨겨주고, 스크롤을 위로 다시 올릴 때만 "**혹시 최상단으로 올라가고 싶은거니?**"라고 묻기 위해 TOP버튼을 보여줄 생각이다.
```tsx
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== prevScrollY || currentScrollY === 0) {
      setIsVisible(currentScrollY < prevScrollY);
      setPrevScrollY(currentScrollY);
    }
    // 다음 스크롤 이벤트 등록
  };
  useEffect(() => {
    // 컴포넌트 마운트 시에 스크롤 이벤트 등록
    // 컴포넌트 언마운트 시에 스크롤 이벤트 제거
  }, [prevScrollY]);
```
## 구현 방법: 이벤트를 어떻게 toggling 할까?
### 1. window에 scroll이벤트를 toggling
먼저 GPT에게 어떻게 구현하면 좋을지 물어봤다. GPT가 추천해준 방법은 window에 scroll이벤트를 toggling하여 구현하는 방법이었다. 하지만 이렇게 구현하는 경우 Event Loop를 매번 호출하여 성능에 영향을 줄 수 있다. scroll이벤트의 핸들러를 호출할 때마다 Task Queue로 쌓이기 때문이다.

#### Task Queue
JavaScript 런타임 환경에서 비동기적으로 처리되어야 하는 작업들을 보관하는 자료 구조이다.\
Task Queue에 작업이 추가되는 경우는 다음과 같은 상황이 있다.
- Web API가 호출 된 후 등록된 이벤트 핸들러
- setTimeout()과 setInterval()로 추가한 콜백

### 2. requestAnimationFrame을 활용한 성능 개선
이를 개선하기 위해 requestAnimationFrame을 활용한 방법을 고려했다.
#### requestAnimationFrame
requestAnimationFrame은 브라우저에게 특정 함수를 다음 리페인트 사이클에 실행해달라고 요청한다. 이를 사용하여 스크롤 이벤트를 처리하면 브라우저의 다음 프레임이 그려지기 직전에 해당 작업을 수행할 수 있어, 애니메이션은 부드럽게 동작(약 60Hz, 16.67ms)하고 사용자 경험을 향상시킬 수 있다.

```tsx
const requestRef = useRef<number | null>(null);
const handleScroll = () => {
    // 스크롤이 발생하거나 페이지 맨 위로 스크롤될 때
    // 1. TOP 버튼의 가시성 설정
    // 2. 이전 스크롤 위치 업데이트

    requestRef.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [prevScrollY]);
```
이를 통해 scroll이벤트의 핸들러가 매번 호출되는 것을 피하며, 스크롤에 따른 TOP 버튼의 가시성을 조절할 수 있다.

## 전체 코드
```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const requestRef = useRef<number | null>(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== prevScrollY || currentScrollY === 0) {
      setIsVisible(currentScrollY < prevScrollY);
      setPrevScrollY(currentScrollY);
    }
    requestRef.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [prevScrollY]);

  return (
    <button
      className={`fixed bottom-8 right-8 transition-opacity rounded-full overflow-hidden border-2 border-green-light bg-white hover:shadow-md ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      } cursor-pointer`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <FaArrowUp className='text-4xl bg-white m-2 text-green-800 opacity-70' />
    </button>
  );
}
```

## References
- [Task Queue](https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide#%ED%83%9C%EC%8A%A4%ED%81%AC_vs_%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%ED%83%9C%EC%8A%A4%ED%81%AC)
- [requestAnimationFrame](https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame)