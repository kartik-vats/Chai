
import React from 'react'
import Chatarea from '@/components/chatarea'
import Contactbar from '@/components/contactbar'
import '@/app/globals.css'
function page() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-20 bg-black text-white'>
         <h1 className='text-3xl font-bold text-center'>Chai</h1>
      <p className='text-center'>Welcome to the chai chat page!</p>
      </div>
     
      <div className='chatbox'>
      <div className='flex flex-row h-screen w-1/2'>
      <Contactbar/>
      </div>
      <div className='h-screen w-1/2'>
      <Chatarea/>
      </div>
    </div>
    </div>
    
  )
}

export default page
