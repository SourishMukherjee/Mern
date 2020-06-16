import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import {Container,Button} from 'reactstrap';
import {BrowserRouter,Redirect,Route, NavLink} from 'react-router-dom';
import form from './components/form';
import draftform from './components/draftform';

import {loadUser} from './actions/authActions';
import screens from './components/screens';
import PropTypes from 'prop-types';
class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    
  return (
    <Provider store={store}>
      <BrowserRouter>
    <div className="App">
      <AppNavbar/>

      <Route exact path ='/form/screens' component={screens}/>
      <Route exact path='/form' component={form}/> 
      <Route exact path='/draftform' component={draftform}/>     
    </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
//<ShoppingList/>
//<ItemModal/>