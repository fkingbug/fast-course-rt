import React from 'react'
import Card, { CardVariant } from './components/Card'
import UserList from './components/UserList'
//15:53
const App = () => {
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
      <UserList users={[]} />
    </div>
  )
}

export default App
