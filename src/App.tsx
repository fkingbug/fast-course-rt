import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card, { CardVariant } from './components/Card'
import UserList from './components/UserList'
import { IUser } from './types/types'

//15:53
const App = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {}, [])

  async function fetchUsers() {
    try {
      const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (e) {
      console.error(e)
    }
  }
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
