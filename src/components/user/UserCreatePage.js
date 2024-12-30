import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import './UserCreatePage.css'

export function UserCreatePage() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const navigate = useNavigate()
	const onSubmit = data => {
		console.log(data);
		axios.post('/api/post/postNewUser', { ...data })
			.then(() => {
				console.log('new post success')
				navigate('/userList')
			}).catch(err => console.log(err))
	}

	return (
		<>
			<div> create new userpage </div>
			<form id="form" className="validate" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-field">
					<label htmlFor="name">Full Name</label>
					<input type="text" name="name" id="name"
						{...register("name", { required: true })} />
					{errors.name && <span>This field is required</span>}
				</div>
				<div className="form-field">
					<label htmlFor="jobTitle">Job Title</label>
					<input type="text" name="jobTitle" id="jobTitle"
						{...register("jobTitle", { required: true })} />
					{errors.jobTitle && <span>This field is required</span>}
				</div>
				<div className="form-field">
					<label></label>
					<input type="submit" value="Create New User" />
				</div>
			</form>
		</>
	)
}
