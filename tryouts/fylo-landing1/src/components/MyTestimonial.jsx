import React from 'react'

const MyTestimonial = ({data}) => {
    const {pic, uname, posi, msg} = data;
    return (
        <div className='bg-dBlueTestimon p-5 w-72 xs:w-80'>
            <div className='text-white text-sm '>{msg}</div>
            <div className='flex items-center gap-x-4 mt-4 text-gray-300 h-10'>
                <img src={pic} alt="" className='h-full rounded-full' />
                <div>
                    <div className='text-xs uppercase'>{uname}</div>
                    <div className='text-xs mt-1'>{posi}</div>
                </div>
            </div>
        </div>
    );
}

export default MyTestimonial