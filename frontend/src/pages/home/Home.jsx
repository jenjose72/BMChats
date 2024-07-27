import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'

const Home = () => {
  return (
		<div className='flex sm:h-[100%] md:h-[100%] md:w-[100%] sm:w-[100%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
}

export default Home