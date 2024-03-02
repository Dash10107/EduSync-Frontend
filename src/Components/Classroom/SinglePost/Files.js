import React from 'react';

const Files = ({ postUrl }) => {
  function getFileNameFromCloudinaryURL(url) {
    const matches = url?.match(/\/v\d+\/classroom-posts\/([^/]+)$/);
    return matches ? matches[1] : null;
  }
  
  const fileName = getFileNameFromCloudinaryURL(postUrl);
  
  
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(postUrl); // Check if the file is an image  
  return (
    <>
      {isImage ? (
        <div className='flex m-2 items-center border border-gray-300 rounded-lg justify-between cursor-pointer'>
         
          <div className=''>
          <img className='rounded-r-lg' src={postUrl} alt={fileName} style={{ height: 'auto', maxWidth: '100%' }} />
          </div>
        
        </div>
      ) : (
        <a href={postUrl} target="_blank" rel="noopener noreferrer" download={postUrl}>
          <div className='flex m-2 items-center border border-gray-300 rounded-lg justify-between cursor-pointer'>
            <div className='px-4 py-2'>{fileName}</div>
            <div className='pl-4'>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default Files;
