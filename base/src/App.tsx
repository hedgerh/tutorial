import React from 'react';
import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
} from 'react-smooshpack';
import "react-smooshpack/dist/styles.css";
import './App.css';

import files from './files'

const App = () => {
  return (
    <>
      <SandpackProvider files={files} entry="/src/index.js">
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <FileExplorer style={{ width: 180 }} />
          <CodeMirror style={{ flex: 1 }} />
          <BrowserPreview style={{ flex: 1 }} />
        </div>
      </SandpackProvider>
    </>
  )
}

export default App;
