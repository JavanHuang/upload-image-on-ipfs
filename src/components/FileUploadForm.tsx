import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';

import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

interface IFileUploadFormProps {
  file: any;
  setFile: Dispatch<SetStateAction<any>>
  setUrlArray: Dispatch<SetStateAction<any>>
}

const ipfsClient = create({
  url: 'https://ipfs.infura.io:5001/api/v0'
});

const FileUploadForm: FC<IFileUploadFormProps> = ({ file, setFile, setUrlArray }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const retrieveFile = (e: any) => {
    const data = e.target.files[0];
    const fileReader = new window.FileReader();

    fileReader.readAsArrayBuffer(data);

    fileReader.onloadend = () => {
      console.log(fileReader.result);
      console.log(typeof fileReader.result);
      if (typeof fileReader.result === 'object' && fileReader.result) {
        console.log("Buffer data: ", Buffer.from(fileReader.result));
        const bufferArray = Buffer.from(fileReader.result);
        setFile(bufferArray);
      }
    }

    e.preventDefault();
  };


  const handleSubmitFile = async (e: any) => {
    e.preventDefault();

    try {
      if (file) {
        const created = await ipfsClient.add(file);

        console.log('created', created);

        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        setUrlArray((prev: any) => [...prev, url]);
      } else {
        setErrorMessage('No file selected');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitButtonClassName = useMemo(() => {
    console.log(!!file);
    return !!file ? 'button' : 'button disabled';
  }, [file]);

  return (
    <div className="main">
      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={retrieveFile} />
        <button type="submit" className={submitButtonClassName} disabled={!file}>Submit</button>
        <div className="error">{errorMessage}</div>
      </form>
    </div>
  )
}

export default FileUploadForm