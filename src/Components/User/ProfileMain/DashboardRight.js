import React from 'react'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const DashboardRight = ({userData,userDetails}) => {
  const words = userDetails.name.split(" "); // Split the string into words
  const initials = words.map(word => word.charAt(0).toUpperCase()).join(" "); // Get the first character (initial) of each word and capitalize it
  return (
    <>
        <div className='w-full flex flex-col md:flex-row lg:flex-col pt-5 items-center justify-center'>
        <div className='p-10 flex justify-center mt-20 lg:mt-10'>
        <Avatar className='hover:bg-stone-500 cursor-pointer' alt="Michael Jackson"  sx={{width: 200, height: 200 }} >{initials} </Avatar>
        </div>
        <div className='flex flex-col mt-8 lg:mt-4 justify-center md:w-[80%] w-[100%]'>
        <TextField
          id="outlined-read-only-input"
          sx={{margin: 2}}
          label="Read Only"
          defaultValue={userDetails.name}
          InputProps={{
            readOnly: true,
          }}
          />
        <TextField
          id="outlined-read-only-input"
          sx={{margin: 2}}
          label="Read Only"
          defaultValue={userDetails.email}
          InputProps={{
            readOnly: true,
          }}
          />
        <TextField
          id="outlined-read-only-input"
          sx={{margin: 2}}
          label="Read Only"
          defaultValue="Encrypted Password"
          InputProps={{
            readOnly: true,
          }}
          />
        <TextField
          id="outlined-read-only-input"
          sx={{margin: 2}}
          label="Read Only"
          defaultValue="Encrypted Password"
          InputProps={{
            readOnly: true,
          }}
          />
        </div>
        </div> 
    </>
  )
}

export default DashboardRight
