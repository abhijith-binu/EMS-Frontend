import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { viewprofile } from '../services/allApis'
import { BASE_URL } from '../services/base_url'


function Profile() {

  // use useparams hook to get path prarmeter of route
  const {id} = useParams()

  // state  for profile data
  const  [data, setData] = useState({})

  // define fuction to get specific profile
  const getProfile = async ()=>{
   const {data} = await viewprofile(id)
   setData(data)
  }

  useEffect(()=>{
    getProfile()
  })

  return (
    <>
      <div className="container mt-5">
        <Card className='shadow col-lg-6 mx-auto'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="profile_img d-flex justify-content-center">
                <img className='rounded' width={'130px'} height={'130px'} src={`${BASE_URL}/uploads/${data.profile}`} alt="" />
                </div>
              </div>
            </Row>
            <div className='text-center'>
              <h3>{data.fname} {data.lname}</h3>
              <h5>{data.email}</h5>
              <h5>{data.mobile}</h5>
              <h5>{data.gender}</h5>
              <h5>{data.location}</h5>
              <h5>{data.status}</h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Profile