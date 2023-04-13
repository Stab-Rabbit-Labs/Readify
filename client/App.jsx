import React from 'react';
import MainContainer from './containers/MainContainer';
import Header from './components/Header'; 

function App() {
  return (
    <div  className='w-500 max-w-screen-lg m-auto'>
      <Header/>
      <MainContainer />
    </div>
  )
}

export default App;