import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-full min-h-screen flex justify-center items-center z-20 bg-[#1B202D]'>
            <div className="animate-spin rounded-full h-16 w-16 border-[5px] border-t-white border-[grey] "></div>
        </div>
    )
}

export default Loader