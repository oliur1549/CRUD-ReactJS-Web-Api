import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Employee } from './components/Employee';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './custom.css';
import {Navigation} from './components/Navigation';

function App() {
    return (
        <BrowserRouter>
        <div className="container">

            <h3 className="d-flex justify-content-center">
                ReactJS WEB API CRUD
            </h3>
<Navigation/>
        <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/employee' component={Employee}/>  
        </Switch>    

            
            </div>
        </BrowserRouter>
        );
}


export default App;
//export default class App extends Component {
//  static displayName = App.name;

//  render () {
//    return (
//      <Layout>
//        <Route exact path='/' component={Home} />
//        <Route path='/counter' component={Counter} />
//        <Route path='/fetch-data' component={FetchData} />
//      </Layout>
//    );
//  }
//}
