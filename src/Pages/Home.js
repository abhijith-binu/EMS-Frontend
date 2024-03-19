import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import HomeTable from '../Components/HomeTable'
import { useNavigate } from 'react-router-dom'
import { deleteContext, registerContext } from '../Components/ContextShare'
import { getusersapi, removeUser } from '../services/allApis'


function Home() {

  // get delete context using useContext
  const {deleteData,setDeleteData} = useContext(deleteContext)

  // state to hold search data
  const [searchData, setSearchData] = useState('')

  // state to hold all users
  const  [userList, setUserList] = useState([])

  
  // define delete user
  const deleteUser = async(id)=>{
    console.log('item deleted'+id);
    // make api call to services
    const res = await removeUser(id)
    // console.log(res);
    if(res.status == 200){
      setDeleteData(res.data)
      getusersDetails()
    }else{
      console.log('error');
    }
   }

  // define a fuction to call get all users api
  const getusersDetails = async()=>{
    const ress = await getusersapi(searchData)
    // console.log(ress.data);
    setUserList(ress.data)
    // console.log(userList);
   
  } 

  // get register context
   const {registerData,setRegisterData} = useContext(registerContext)
 

  // navigate to another page useNavigate
  const navigate = useNavigate()
 
  // to redirect to register page when add btn clicked
   const addUser=()=>{
    // navigate to register
    navigate('/register')

   }
   useEffect(()=>{
    // call getuserapi
    getusersDetails()
  },[searchData])
  return (

    <>
    {
      registerData?<Alert  variant='Success' onClose={()=>setRegisterData('')} dismissible>{registerData.fname.toUpperCase()} Successfully Registered...</Alert>:''
    }
    {
      deleteData?<Alert  variant='danger' onClose={()=>setDeleteData('')} dismissible>{deleteData.fname.toUpperCase()} Successfully Deleted...</Alert>:''
    }
      <div className='container mt-5'>
        <div className="first_div">
          {/* search add btn */}
          <div className="search_add d-flex justify-content-between">
          <div className="search col-md-4">
            <Form className='d-flex'>
              <Form.Control
              style={{width:'300px'}}
              required
              type='text'
              placeholder='Search'
              onChange={e=>setSearchData(e.target.value)}
               />
              <Button className='ms-2' variant='success'>Search</Button>
            </Form>
          </div>
          {/* add button */}
          <div className="add">
           <button onClick={addUser} className='btn btn-warning4'> <i className="fa-solid fa-user-plus fa-fade me-2"></i>Add</button>
          </div>
          </div>
        </div>
  
        <div className="sec_div">
          {/* table */}
          <HomeTable displayData= {userList}  handleDelete={deleteUser} ></HomeTable>
        </div>
      </div>
    </>
  )
}

export default Home