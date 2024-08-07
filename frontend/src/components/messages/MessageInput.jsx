import React from 'react'
import {useEffect,useState} from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import {BsSend} from 'react-icons/bs'
const MessageInput = () => {
  const [message,setMessage]=useState();
  const {sendMessage,loading}=useSendMessage();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message)
      return;
    await sendMessage(message);
    setMessage("");

    console.log('Submitting message');
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type='text'
                className='border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white'
                placeholder='Send a Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type='submit'
                className='absolute inset-y-0 end-0 flex items-center pe-3'>
                  {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
            </button>
            
        </div>
    </form>
  )
}

export default MessageInput