import React, { FC } from 'react'

interface IImageListProps {
  urlArray: any[];
}

const ImageList: FC<IImageListProps> = ({ urlArray }) => {
  return (
    <div className="images">
    <h3>Uploaded data</h3>
    <div className="display">
      {urlArray.length !== 0 && urlArray.map((url) => 
      <div className="ipfsImage">
        <img src={url} alt={url} key={url} />
        <div className="ipfsUrl">IPFS URL: {url}</div>
      </div>)}
    </div>
    </div>
  )
}

export default ImageList