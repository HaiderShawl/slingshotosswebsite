import React from 'react'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Userpage from './components/Userpage'
import Create from './components/Create'
import Challenge from './components/Challenge'
import Challenges from './components/Challenges'


import "react-datetime/css/react-datetime.css";

import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App" style={{backgroundColor:"#020202"}}>
      <Header />
      <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/userpage" component={Userpage} exact />
            <Route path="/challenges" component={Challenges} exact/>
            <Route path="/challenges/:id" component={Challenge} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
