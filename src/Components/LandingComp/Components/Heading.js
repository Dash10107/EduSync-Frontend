import React from 'react';
import ProfileLogo from '../../../Assets/logo.png';
import SearchComponent from './SearchComponent';
import LoginButton from './LoginButton';


function Heading({searchInput,setSearchInput,handleSearchInputChange}) {
    return (
        <div className='w-full h-[10vh] 2xl:h-[7vh] bg-blue-950 text-white flex items-center justify-center space-x-10 shadow-md shadow-gray-500'>

            <div className='absolute left-5 '>
                <img src={ProfileLogo} alt="Profile Logo" className='h-[8vh] sm:h-[10vh] sm:pl-[1%] 2xl:h-[7vh] ' />
            </div>

            <div className='w-[35%] md:w-[40%] lg:w-[35%] 2xl:w-[40%] md:absolute md:left-44 lg:left-0 lg:relative hidden sm:block'>
                <SearchComponent searchInput={searchInput} setSearchInput={setSearchInput} handleSearchInputChange={handleSearchInputChange}  />
            </div>

            <div className='absolute right-3 md:right-3 lg:right-9  '>
                <LoginButton />
            </div>

        </div>
    );
}

export default Heading;
