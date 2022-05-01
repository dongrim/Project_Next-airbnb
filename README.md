# Airbnb Tutorial

## Book

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Dependencis

1. `Redux`

- redux
- next-redux-wrapper
- @reduxjs/toolkit
- react-redux
- @types/react-redux

2. `Styled-Components`

- styled-components
- @types/styled-components

3. `ESLint`

## Node modules

1. `react-outside-click-handler`

```js
$ yarn add react-outside-click-handler
$ yarn add @types/react-outside-click-handler -D
```

```js
📁 components/HeaderAuths.tsx

import OutsideClickHandler from 'react-outside-click-handler';

<OutsideClickHandler
  onOutsideClick={() => {
    if (isUsermenuOpend) {
      setIsUsermenuOpend(false);
    }
  }}></OutsideClickHandler>;
```

## Debug

1. 'module' is not defined. eslint(no-undef)

```js
📁 .eslintrc.js

module.exports = {
  env: {
    node: true,
  },
```

2. Warning: Prop 'className' did not match. Server: "sc-ksdxgE irTnqB" Client: "sc-bdvvtL fysqpN"

```js
📁 .babelrc
{
   "presets": ["next/babel"],
   "plugins": ["babel-plugin-styled-components"]
}
```
