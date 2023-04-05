import {Link} from 'react-router-dom';
import React from 'react'
// import wormBookLogo from '../assets/wormBookLogo.png'

export default function LoginHeader({
    heading, 
    paragraph, 
    linkName,
    linkUrl="#"
}) {
  return (
    <div className='mb-10'>
        <div className='flex justify-center'>
            <img 
                alt='our logo'
                className='h-40 w-40' 
                src="public/wormbookLogo.png" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {heading}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600" >
            {paragraph} {' '}
            <Link to={linkUrl} className='font-medium text-blue-600 hover:text-blue-500'>
                {linkName}
            </Link>
        </p>
    </div>
  )
}
