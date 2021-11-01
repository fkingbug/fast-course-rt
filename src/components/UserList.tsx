import { FC } from 'react'
import { IUser } from '../types/types'

interface UserListProps {
  users: IUser[]
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{ padding: 15, border: '1px solid gray' }}>
          {user.id}. {user.name} проживает в городе {user.address.city} на улицу{' '}
          {user.address.street}
        </div>
      ))}
    </div>
  )
}

export default UserList
