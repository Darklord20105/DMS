import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th> description </th>
        <th> amount </th>
        <th> unitPrice </th>
        <th> totalValue </th>
      </tr>
    </thead>
  )
}

const TableBody = ({ data, id, queryClient }) => {
  //const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: deleteDebt,
    onSuccess: () => {
      queryClient.invalidateQueries(['userView']);
      alert('success');
    },
  });
  
  const handleDelete = (data) => {
    //alert(JSON.stringify(data));
    mutate(data);
  };
  
  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            <td> {item.description}</td>
            <td> {item.amount} </td>
            <td> {item.unitPrice} </td>
            <td> {item.totalValue}</td>
            <td> <button onClick={
		() => handleDelete({debtID: item._id, userID: id})
	    }>delete</button> </td>
          </tr>)
      })
      }
    </tbody>
  )
}
const createDebt = (data) => {
  console.log(data, 'darare new debt')
  axios.post('/api/post/postNewDebtForUser', data)
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

const deleteDebt = (data) => {
  alert(JSON.stringify(data));
  axios.delete('/api/delete/deleteDebtItem', { params : data } )
  .then( () => console.log('delete success'))
  .catch(err => console.log(err))
}
const options = ["regular diesel", "processed diesel", "super diesel", "regular gasoline", "super gasoline", "kerosine"]

const DebtForm = ({id, queryClient}) => {
  //const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries(['userView']);
      alert('success');
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    mutate({...data, id});
  };
  return (
    <form id="form" className="validate" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="description">Description </label>
        <select name="description" id="description"
          {...register("description")}
        >
          {options.map(item => {
            return (<option value={item} key={item}>{item}</option>)
          })}

        </select>
      </div>
      <div className="form-field">
        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" id="amount"
          {...register("amount", { required: true })} />
        {errors.amount && <span>This field is required</span>}
      </div>

      <div className="form-field">
        <label htmlFor="unitPrice">unit price (US $)</label>
        <input type="number" name="unitPrice" id="unitPrice" step='any'
          {...register("unitPrice", { required: true })} />
        {errors.unitPrice && <span>This field is required</span>}
      </div>

      <div className="form-field">
        <label></label>
        <input type="submit" value="Create New Debt entry" />
      </div>
      <h1>
	  {isPending && 'creating new Entry'}
	  {isError && 'an error ocurred count create a new entry'}
	  {isSuccess && 'Created successfully'}
      </h1>
    </form>
  )
}
/////
const createPayment = (data) => {
  console.log(data, 'darare new payment')
  axios.post('/api/post/postNewPaymentForUser', data)
  .then(data => console.log(data))                                                        .catch(err => console.log(err))
}
const PaymentForm = ({id, queryClient}) => {
  //const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(['userView']);
      alert('success');
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));                                                            mutate({...data, id});
  };
  return (
    <form id="form" className="validate" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label htmlFor="paymentAmount">u (US $)</label>
        <input type="number" name="paymentAmount" id="paymentAmount" step='any'
          {...register("paymentAmount", { required: true })} />
        {errors.unitPrice && <span>This field is required</span>}
      </div>

      <div className="form-field">
        <label></label>
        <input type="submit" value="Create New payment entry" />
      </div>
      <h1>                                                                                        {isPending && 'creating new Entry'}
          {isError && 'an error ocurred couldnt create a new payment entry'}
          {isSuccess && 'Created successfully'}                                               </h1>
    </form>
  )
}
/////
export function UserViewPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { isPending, isError, data, error, refetch, status } = useQuery({
    queryKey: 'userView',
    queryFn: () => fetchData(),
    retry: true,
    retryDelay: 3000,
  });

  function fetchData() {
    return fetch(`/api/get/getUser/${id}`).then(res => res.json())
  }

  if (isPending) return 'Loading...'
  if (isError) return 'An error has occurred: ' + error.message

  return (
    <div id="contact">
      <div>
        <img
          src={"https://placekitten.com/g/200/200"}
        />
      </div>

      <div>
        <h1>
          {data.name}
        </h1>
        <div> overallValue : {data.overallValue}</div>
        <div> totalDebt : {data.totalDebt}</div>
        <div> totalPayment : {data.totalPayment}</div>
        <h2>add new debt</h2>
        <PaymentForm id={id} queryClient={queryClient} />
	<DebtForm id={id} queryClient={queryClient} />
        <table>
          {
            data.debtList.length > 0 ?
              (<>
                <TableHead />
                <TableBody data={data.debtList} id={id} queryClient={queryClient}/>
              </>) : (<h5>no data yet</h5>)
          }
        </table>
      </div>
    </div>
  );
}

