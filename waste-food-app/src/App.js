// import React from 'react';
// import './App.css';
// import {  BrowserRouter as Router } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import FoodList from './components/FoodList'
// import addFoodItem from './components/AddFoodItem'
// import addPerson from './components/AddPerson'
// import share from './components/share';
//import Login from './SignIn';
// import { AuthProvider } from './Auth';
// import { PrivateRoute } from './PrivateRoute'

// function App() {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <Router>
//         <div>
//           <Router exact path="/" component={FoodList} />
//           <Router path="/addItem" component={addFoodItem} />
//           {/* <PrivateRoute path="/addPerson" component={addPerson} />
//           <PrivateRoute path="/share" component={share} /> */}
//           <Router path="/login" component={Login} />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
// import { Switch, Route } from 'react-router-dom'
import FoodList from './components/FoodList'
import addFoodItem from './components/AddFoodItem'
import addPerson from './components/AddPerson'
import share from './components/share'
import PrivateRoute from './PrivateRoute';
import Login from './components/Login';
import Signup from './components/SignUp';
import FoodItem from './components/FoodItem';
import { AuthContext } from "./Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    localStorage.setItem("alert", false);
    setAuthTokens(data);
  }
  return (

<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute exact path="/" component={FoodList} />
      <PrivateRoute path="/addPerson" component={addPerson} />
      <PrivateRoute path="/foodItem/:id" component={FoodItem} />
      <PrivateRoute path="/share" component={share} />
      <PrivateRoute path="/addItem" component={addFoodItem} />
    </Router>
    </AuthContext.Provider>
  );
}

export default App;

