import React from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/base_url'

function HomeTable({displayData,handleDelete}) {
    const tableDisplay = displayData

    
    return (
        <>
            <div className="container mt-5">
                <Row>
                    <div className="col">
                        <Card className='shadow'>
                            <Table className='align-items-center' responsive='sm'>
                                <thead>
                                    <tr className='table-danger'>
                                        <th>NO</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Status</th>
                                        <th>Profile</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       tableDisplay.length>0? tableDisplay.map((item,index)=>(

                                     
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.fname} &nbsp; {item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant={item.status==="Active"?"success":'danger'} id="dropdown-status">
                                                   {item.status}
                                                </Dropdown.Toggle>


                                            </Dropdown>
                                        </td>
                                        <td>
                                            <img className='rounded' width={'60px'} height={'60px'} src={`${BASE_URL}/uploads/${item.profile}`} alt="" />
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    <div className="fa-solid fa-ellipsis-vertical fa-beat"></div>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <Link style={{ textDecoration: 'none' }} to={`/profile/${item._id}`}>
                                                            <i className='fa-solid fa-eye text-light'></i>
                                                            <span className='fs-5 ms-1'>View</span>
                                                        </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Link style={{ textDecoration: 'none' }} to={`/edit/${item._id}`}>
                                                            <i className='fa-solid fa-pen text-light'></i>
                                                            <span className='fs-5 ms-1'>Edit</span>
                                                        </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={()=>handleDelete(item._id)} >
                                                        <i className='fa-solid fa-trash'></i>
                                                        <span className='fs-5 ms-1'>Delete</span>
                                                    </Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                       )):<tr><p>Nothing to display</p></tr>
                                
                                       
                                    }
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default HomeTable