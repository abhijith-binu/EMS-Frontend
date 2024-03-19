import { BASE_URL } from "./base_url"
import { commonRequest } from "./commonReq"

// register
export const empRegister = async(body,headers)=>{
  return commonRequest("POST",`${BASE_URL}/employee/register`, body , headers)

}
// getall users api
export const getusersapi = async(searchData)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchData}`,'')
}

// view profile
export const viewprofile = async(id)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/view-profile/${id}`,'')
}

// delete profile
export const removeUser = async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
}

// edit user
export const updateUser = async(id,body,headers)=>{
  return commonRequest("PUT",`${BASE_URL}/employee/update/${id}`, body,headers)

}