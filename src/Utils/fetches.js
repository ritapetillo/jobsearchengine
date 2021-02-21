import axios from "axios";
const { REACT_APP_API_URI ,REACT_APP_LOCAL_API_URI} = process.env;

export const fetchJobResults = async (position, location) => {
  try {
    const res = await axios.get(
      `/positions.json?description=${position}&location=${location}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSingleJob = async (id) => {
  try {
    const res = await axios.get(`/positions/${id}.json`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async() =>{
  try{
    const res = await axios.get(`${REACT_APP_LOCAL_API_URI}/api/users/me`,{
      withCredentials:true
    })
    const data = await res.data
    // console.log(data)
    return data
  }catch(err){console.log(err)}
}

export const logout = async() =>{
  try{
    const res = await axios.get(`${REACT_APP_LOCAL_API_URI}/api/users/auth/logout`,{
      withCredentials:true
    })
    const data = await res.data
    console.log(data)
    return data
  }catch(err){console.log(err)}
}
