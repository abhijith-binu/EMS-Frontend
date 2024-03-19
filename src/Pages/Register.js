import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Row } from 'react-bootstrap'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { empRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { registerContext } from '../Components/ContextShare'

function Register() {

  // error msg
  const [errorMsg, setErrorMsg] = useState("")

  // to get context
  const {registerData , setRegisterData} = useContext(registerContext)

  // user navigate hook
  const navigate = useNavigate()

  // status dropdown
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  // create state to hold user input data
  const [userData,setuserdata] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:'',
    gender:'',
    location:''
  })

  // create state for status
  const [status, setStatus] = useState('Active')

  // update status state
  const updateStatus =(e)=>{
   setStatus(e.value)
  }


  // to update userdata when user enters the input using html
  const userDetails = (e)=>{
  const {name,value} = e.target
  setuserdata({...userData,[name]:value})
  }

  // create state for image
  const [image, setImage] = useState("")

  // to update state for img
  const updateImage =(e)=>{
   setImage(e.target.files[0])
  }
  // console.log(image);


  // defining register submittion
  const handleSubmit = async (e)=>{
    // prevent click event from reload
    e.preventDefault()

    // get user input data form the form
    const {fname,lname,email,mobile,gender,location} = userData
    if(fname===""){
      toast.error('First name is required')
    }
    else if(lname===""){
      toast.error('Last name is required')
    }
    else if(email===""){
      toast.error('Email is required')
    }
    else if(mobile===""){
      toast.error('Mobile is required')
    }
    else if(gender===""){
      toast.error('Gender is required')
    }
    else if(image===""){
      toast.error('image is required')
    }
    else if(location===""){
      toast.error('Location is required')
    }
    else{
    //  make register api call

    const headerConfig = {
      'Content-Type': 'multipart/form-data'
    }
    // body - formdata
    const data = new FormData()
    data.append("user_profile",image)
    data.append("fname",fname)
    data.append("lname",lname)
    data.append("email",email)
    data.append("mobile",mobile)
    data.append("gender",gender)
    data.append("status",status)
    data.append("location",location)

     const response = await empRegister(data,headerConfig)
     //console.log(Response);
     if(response.status===200){
      // reset all states
      setuserdata({...userData,
        fname:"",
        lname:"",
       email:"",
       mobile:'',
        gender:'',
        location:''
        
      })
      setStatus('')
      setImage('')

      // share response data to other component  via context
      setRegisterData(response.data)

      // navigate to home page
      navigate('/')

     }
     else
     {
       setErrorMsg('Error')
     }
    } 
  }
  // create a state for hold profile pic
  const [profile,setProfile] = useState('')

  useEffect(()=>{
  // update profile picture
   if(image){
    setProfile(URL.createObjectURL(image))
   }
  },[image])

  return (
    <div>
    {
      errorMsg?<Alert variant='danger' className='bg-danger' onClose={()=>setErrorMsg("")} dismissible >{errorMsg}
      </Alert>:''
    }
      <div className="container mt-5">
        <h2 className='text-center mt-3'>Register Employee Details</h2>
        <Card className='shadow'>
         <div className="text-center mt-3">
         <img className='rounded' width={'50px'} height={'50px'} src={profile?profile:"https://i.ytimg.com/vi/nMR9V8odxrk/maxresdefault.jpg"} alt="" />

         </div>
         <Form className='p-2'>
          <Row >
            <Form.Group className='col-lg-6'>
            <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={userDetails}
            value={userData.fname}
            name='fname'
          />
            </Form.Group>

            <Form.Group className='col-lg-6'>
            <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={userDetails}
            value={userData.lname}
            name='lname'
          />
            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email Address"
            onChange={userDetails}
            value={userData.email}
            name='email'
          />
            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Mobile</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Mobile"
            onChange={userDetails}
            value={userData.mobile}
            name='mobile'
          />
            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Gender</Form.Label>
          <Form.Check
            required
            type={"radio"}
            label={'Male'}
            name='gender'
            value={"Male"}
            onChange={userDetails}
          />
          <Form.Check
            required
            type={"radio"}
            label={'Female'}
            name='gender'
            value={"Female"}
            onChange={userDetails}

          />
            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Select Employee Status</Form.Label>
            <Select className='text-black' options={options} defaultInputValue={status}
            onChange={updateStatus}
            />

            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Choose profile picture</Form.Label>
          <Form.Control
          name='user_profile'
            required
            type="file"
            onChange={updateImage}
          />
            </Form.Group>

            <Form.Group className='col-lg-6 mt-2'>
            <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Employee location"
            onChange={userDetails}
            value={userData.location}
            name='location'
            
          />
            </Form.Group>

            <Button onClick={handleSubmit} className='btn btn-info mt-2 pb-2'>Sumbit</Button>

          </Row>
         </Form>
        </Card>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  
  )
}

export default Register