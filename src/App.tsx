import React, { useState } from 'react'
import Card, { CardVariant } from './components/Card'
import UserList from './components/UserList'
import { IUser } from './types/types'

//15:53
const App = () => {
  const [users, setUsers] = useState<IUser[]>([])
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
