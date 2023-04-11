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


// import React, { Component } from 'react';
// // import Header from './Header.js'
// // import FinderContainer from './FinderContainer.js'




// class App extends Component {

//     render() {
//         return (
//             <div>
//                 WOW
//             </div>
//         )
//     }
// }

// export default App;