import { useState } from "react"
import type { UsersData } from "../types"
import UserForm from "./UserForm";
import AllUsers from "./AllUsers";
const UsersEditPage = () => {
    
    const[edituser,setedituser]=useState<UsersData |null>(null);

  return (
    <>
    <UserForm
    edituser={edituser}
    setedituser={setedituser}
    />
    <AllUsers
    setedituser={setedituser}
    />
      
    </>
  )
}

export default UsersEditPage
