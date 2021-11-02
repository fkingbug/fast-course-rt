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

---

Пример работы с массивом users (Данные не из сервера)
Массмв users зависит от интерфейса IUser(соответствует требования полей)
App.js (С фейк джейсончиком):

```typescript
import React from 'react'
import Card, { CardVariant } from './components/Card'
import UserList from './components/UserList'
import { IUser } from './types/types'

//15:53
const App = () => {
  const users: IUser[] = [
    {
      id: 1,
      name: 'Ulbi tv',
      email: 'qweqwe@mail.ru',
      address: { city: 'Moscow', street: 'Lenina', zipcode: '123' },
    },
    {
      id: 2,
      name: 'Арчаков',
      email: 'archacow@mail.ru',
      address: { city: 'NNOW', street: 'Lenina', zipcode: '123' },
    },
  ]
  return (
    <div>
      <Card
        onClick={(num) => console.log('click', num)}
        variant={CardVariant.primary}
        width='200px'
        height='200px'
      >
        <button>Кнпока</button>
      </Card>
      <UserList users={users} />
    </div>
  )
}

export default App
```

UserLust :
принимает в себя только 1 пропс (Дженерик как Обобщающий тип)

```typescript
import { FC } from 'react'
import { IUser } from '../types/types'
import UserItem from './UserItem'

interface UserListProps {
  users: IUser[]
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
```

UserItem :
Принимает в себя только 1 пропс user (это не массив , а 1 из объектов этого массива)

```typescript
import React, { FC } from 'react'
import { IUser } from '../types/types'

interface UserItemProps {
  user: IUser
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <div style={{ padding: 15, border: '1px solid gray' }}>
      {user.id}. {user.name} проживает в городе {user.address.city} на улицу {user.address.street}
    </div>
  )
}

export default UserItem
```

---

Типизация запроса на сервер
