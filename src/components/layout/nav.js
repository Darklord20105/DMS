import React from "react"
import { Link } from 'react-router-dom'

export function Nav(){
   return (
	<div>
	   <h1>nav bar</h1>
	   <hr/>
	   <Link to='/'>home</Link>
	   <Link to='/userList'>contact list page</Link>
	   <Link to='/useState'>useState</Link>
	   <Link to='/useEffect'>useEffect</Link>
	</div>
	)}
