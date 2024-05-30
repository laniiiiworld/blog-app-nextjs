javascript로 코딩을 하다보면 false인 경우를 처리해야하는 상황들이 발생한다.\
경우에 따라 false인 모든 경우가 아닌, null과 undefined만 체크되는 경우일 수도 있고,\
혹은 undefined인 경우만 체크될 수도 있다.\
헷갈리는 상황들을 정리해보자.

## false가 될 수 있는 값들

javascript에서는 아래 6가지 경우에 false로 판단한다.

1. false로 명시한 경우
2. 0 또는 -0
3. null
4. undefined
5. 빈 문자열('', "", ``)
6. NaN(= Not a Number)

```javascript
console.log(`false: ${Boolean(false)}`);
console.log(`0: ${Boolean(0)}`);
console.log(`-0: ${Boolean(-0)}`);
console.log(`null: ${Boolean(null)}`);
console.log(`undefined: ${Boolean(undefined)}`);
console.log(`'': ${Boolean('')}`);
console.log(`NaN: ${Boolean(NaN)}`);
```

```bash
false: false
0: false
-0: false
null: false
undefined: false
'': false
NaN: false
```

null과 undefined가 비슷해 보일 수 있지만, 코딩을 하다보면 구분이 필요하다.

### null

아래와 같이 변수에 null을 할당하는 경우는 "넌 비어있는 값이야!"라고 의도한 것이다.

```javascript
let value = null;

console.log(value);
```

### undefined

undefined는 아래 2가지 경우와 같이 의도되지 않은 상태에 해당된다.

1. 선언은 되었지만 값이 정해지지 않은 상태
2. 해당 값을 찾을 수 없을 때

```javascript
let value;
const lani = {
  name: 'lani',
};

console.log(value);
console.log(lani.age);
```

## null VS undefined VS false 중 무엇을 체크할까?

| 문법                    | null | undefined | 그 외 false인 값 |
| ----------------------- | :--: | :-------: | :--------------: |
| Optional Chaining(?.)   |  ✔   |     ✔     |                  |
| 널 병합 연산자(??)      |  ✔   |     ✔     |                  |
| 논리 연산자 OR( \| \| ) |  ✔   |     ✔     |        ✔         |
| 기본값 함수 매개변수    |      |     ✔     |                  |

### Optional Chaining(?.)

Optional Chaining은 연결된 객체 또는 호출된 함수가 undefined 혹은 null인 경우, 오류를 발생시키는 대신 undefined로 판단한다.

```javascript
const person = {
  name: 'lani',
  pet: {
    name: 'nuri',
  },
  adress: null,
};

console.log(person.dog?.name);
console.log(person.someNonExistentMethod?.());
```

### 널 병합 연산자(??)

왼쪽 표현식이 null 또는 undefined인 경우 rightExpr을 실행한다.

```javascript
leftExpr ?? rightExpr;

const value = null ?? 'default string';
console.log(value); // 'default string'
```

### 논리 연산자 OR(||)

왼쪽 표현식의 값이 false인 경우 rightExpr을 실행한다.

```javascript
leftExpr || rightExpr;

const value = '' || 'default string';
console.log(value); // 'default string'
```

### 기본값 함수 매개변수

값이 전달되지 않거나 undefined인 경우에만 명명된 매개변수를 기본값으로 초기화한다.

```javascript
function printString(str = 'default string') {
  console.log(str);
}

printString(undefined); // 'default string'
printString(null); // null
```

이처럼 논리 연산자 OR(||)는 false인지를 확인하고, 기본값 함수 매개변수는 null을 확인하지 않는 차이가 있다.\
널 병합 연산자(??)나 논리 연산자 OR(||)의 경우 표현식을 사용할 수 있다는 점 또한 특징이다.\
\
새로운 문법을 접할 때마다 null, undefined, false 중 무엇을 체크해야하는지 고민하는 습관을 들여 생각지 못했던 부분에서 발생하는 오류를 줄일 수 있기를 기대해본다.

## References

- [자바스크립트 최신 문법 (ES6, ES11) \| 모르면 후회 하는 최신 문법과 사용법 정리 🐶](https://youtu.be/36HrZHzPeuY?si=ikjl6sHht9Qj4776)
- [Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [Logical OR (\|\|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)
- [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
