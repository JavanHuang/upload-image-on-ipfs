import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import FileUploadForm from './components/FileUploadForm';
import ImageList from './components/ImageList';

function App() {
  const [file, setFile] = useState(null);
  const [urlArray, setUrlArray] = useState([]);

  console.log('file', file);
  console.log('urlArray', urlArray);

  return (
    <div className="App">
      <Header />
      <FileUploadForm file={file} setFile={setFile} setUrlArray={setUrlArray} />
      <ImageList urlArray={urlArray} />
    </div>
  );
}

export default App;
