import {useCallback, useEffect, useState} from "react"


export default function Users() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState('1')
  const [nat, setNat] = useState('')

  const refreshUsers = useCallback(() => {
    const url = new URL("https://randomuser.me/api/")
    url.searchParams.set('seed', 'abc')
    url.searchParams.set('page', page.toString())
    url.searchParams.set('results', '10')
    url.searchParams.set('nat', nat)
    window.fetch(url.toString())
      .then(res => {
        res.json().then(res => {
          setUsers(res.results)
        })
      })
  }, [page, nat])

  useEffect(() => {
      if (page !== '') refreshUsers()
    },
    [page, nat, refreshUsers]
  )

  function renderUser(user) {
    return (
      <li>
        <img src={user.picture.medium} alt={user.id.value}/>
        <p>{user.name.title} {user.name.first} {user.name.last}</p>
      </li>
    )
  }

  return (
    <div>
      Page : <input value={page} onChange={event => setPage(event.target.value)}/>
      Nat : <input value={nat} onChange={event => setNat(event.target.value)}/>
      <ul>
        {users.map(renderUser)}
      </ul>
    </div>
  )
}