import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios';
import './listView.css'
import { Link, useNavigate } from 'react-router-dom'
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th> name </th>
        <th> jobTitle </th>
        <th> totalDebt </th>
        <th> totalPayment </th>
        <th> overallValue </th>
        <th> created at </th>
      </tr>
    </thead>
  )
}

const TableBody = ({ data, handleDeleteUser }) => {
  console.log(data)
  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            <td> <Link to={`/user/${item._id}`} state={{ id: item._id }} >{item.name}</Link> </td>
            <td> {item.jobTitle} </td>
            <td> {item.totalDebt} </td>
            <td> {item.totalPayment}</td>
            <td> {item.overallValue}</td>
            <td> {item.createdAt}</td>
            <td> <button onClick={() => handleDeleteUser(item._id)}>delete</button> </td>
          </tr>)
      })
      }
    </tbody>
  )
}



export function UserListPage() {
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const { isPending, isError, data, error, refetch, status } = useQuery({
    queryKey: 'userList',
    queryFn: () => fetchData(),
    retry: true,
    retryDelay: 3000,
  })
  console.log(data, 'query')

  function fetchData() {
    return fetch('/api/get/userList').then(res => res.json())
  }

  function handleDeleteUser(id) {
    console.log(id)
    axios.delete(`/api/delete/deleteUser/${id}`)
      .then((data) => {
        console.log(data)
        refetch()
      })
      .catch(err => console.log(err))
  }

  function calculate() {
    let a = data.reduce(function (acc, obj) {
      return acc + obj.overallValue;
    }, 0);
    return setTotal(a)
  }

  if (isPending) return 'Loading...'

  if (isError) return 'An error has occurred: ' + error.message

  return (
    <>
      <div> contacts page </div>
      <button onClick={() => fetchData()} > Reload </button>
      <button onClick={() => calculate()} > click </button>
      <button onClick={() => navigate('/user/create')} >
        create New user
      </button>
      {total && total}

      <table>
        <TableHead />
        <TableBody data={data} handleDeleteUser={handleDeleteUser} />
      </table >
    </>
  )
}
