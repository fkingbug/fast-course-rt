Пропсы :
Компонент принимающий пропсы должен сделать интерфейс для типов данных пропсов

```typescript
import React from 'react'

interface CardProps {
  width?: string
  height?: string
  children?: React.ReactChild | React.ReactNode
}

const Card = ({ width, height, children }: CardProps) => {
  return <div style={{ width, height, border: '1px solid gray' }}>{children}</div>
}

export default Card
```

Знак вопроса в интерфейсе означает , что поле необязательное для получения в компоненте

```typescript
interface CardProps {
  width?: string
}
```

В компоненте необходимо указать к какому интерфейсу относится пропсы

```typescript
const Card = ({ width}: CardProps)
```

---

React.FC - явно указываем что компонент является функциональным
<CardProps> - Передаем в Джинерик интерфейс к которому будет ссылаться наш компонент
Такая запись позволяет не прописывать children в интерфейсе

```typescript
import React from 'react'

interface CardProps {
  width?: string
  height?: string
}

const Card: React.FC<CardProps> = ({ width, height, children }) => {
  return <div style={{ width, height, border: '1px solid gray' }}>{children}</div>
}

export default Card
```

---

Сокращение записи :
Импортируем FC для улучшения читабельности кода

```typescript
import React, { FC } from 'react'

interface CardProps {
  width?: string
  height?: string
}

const Card: FC<CardProps> = ({ width, height, children }) => {
  return <div style={{ width, height, border: '1px solid gray' }}>{children}</div>
}

export default Card
```

---

Enam

В интерфейсе могут быть поля которые принимаютв себя параметры из enam
(variant Может принять в себя параметр outlined или primary иначе будет ошибка)

```typescript
import React, { FC } from 'react'

export enum CardVariant {
  outlined = 'outlined',
  primary = 'primary',
}

interface CardProps {
  width?: string
  height?: string
  variant: CardVariant
}

const Card: FC<CardProps> = ({ width, height, variant, children }) => {
  return (
    <div
      style={{
        width,
        height,
        border: variant === CardVariant.outlined ? '1px solid gray' : 'none',
        background: variant === CardVariant.primary ? 'lightgray' : '',
      }}
    >
      {children}
    </div>
  )
}

export default Card
```

Передача пропса с полем из Enam
CardVariant - указываем название enam
CardVariant.primary - нужно поле в enam

```typescript
<Card variant={CardVariant.primary} width='200px' height='200px'>
  <button>Кнпока</button>
</Card>
```

---

Передача функции в компонент :

```typescript
interface CardProps {
  onNum?: (num: number) => number // Принимает число и возвращает число
  onStr: (str: string) => string // Принимает строку и возвращает сроку
  onClick: () => void // Ничего не принимает и ничего невозвращает
}
```

Компонент который передает функцию :

```typescript
<Card onClick={() => console.log('click')}></Card>
```

---

папочка types чтобы мы могли использовать типы в разных частях приожения

Компонени UserLisr - Принмает в себя массив объектов

```typescript
interface UserListProps {
  users: IUser[]
}
```

Types/types.tsx :
Каждый элемент массива users - хранит в себе объект ктоторый относится к интерфейсу IUser ,
Поле address из интерфейса IUser наследует типы от interface IAddress
(Данные полученные с API (но указаны не все поля , возможно другими нельзя пользоваться ))

```typescript
export interface IAddress {
  street: string
  city: string
  zipcode: string
}

export interface IUser {
  id: number
  name: string
  email: string
  address: IAddress
}
```
