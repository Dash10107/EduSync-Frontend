import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const DashboardLeft = ({userData,userDetails}) => {

  const [name,setName] = React.useState(userDetails?.name);
  const [gmail,setGmail] = React.useState(userDetails.email);
  const [pass,setPass] = React.useState("Encrypted");
  const [pass2,setPass2] = React.useState("Encrypted");

  const words = userDetails.name.split(" "); // Split the string into words
  const initials = words.map(word => word.charAt(0).toUpperCase()).join(" "); // Get the first character (initial) of each word and capitalize it
  return (
    <>  
        <div className='w-full flex flex-col md:flex-row pt-5 items-center justify-center'>
        <div className='p-10 flex flex-col justify-end '>
        <Avatar className='hover:bg-stone-500 cursor-pointer' alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{width: 200, height: 200 }}>{initials}</Avatar>
        </div>
        <div className='flex flex-col justify-center w-[100%]'>
        <TextField className='' sx={{margin: 2}} id="outlined-basic" label="Name" variant="outlined" value={name}          onClick={(e)=>{setName(e.target.value)}}/>
        <TextField className='' sx={{margin: 2}} id="outlined-basic" label="Gmail" variant="outlined" value={gmail}        onClick={(e)=>{setGmail(e.target.value)}}/>
        <TextField className='' sx={{margin: 2}} id="outlined-basic" label="Password" variant="outlined" value={pass}      onClick={(e)=>{setPass(e.target.value)}}/>
        <TextField className='' sx={{margin: 2}} id="outlined-basic" label="Parent Gmail" variant="outlined" value={pass2} onClick={(e)=>{setPass2(e.target.value)}}/>
        </div>
        </div>
        <div className='pt-5 flex justify-center lg:justify-start mx-2 lg:mx-10 mt-2'>
        <button className=' border-2 p-2 w-[80%] lg:w-[50%] rounded-md '>Update Profile</button>
        </div>
    </>
  )
}

export default DashboardLeft
