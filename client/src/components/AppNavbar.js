import React, { Component,Fragment } from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import form from './form';
import draftform from './draftform'
class AppNavbar extends Component{
    state={
        isOpen:false,
        mail:''
    }
     static propTypes={
         auth:PropTypes.object.isRequired
     }
toggle=()=>{
    this.setState({
    isOpen:!this.state.isOpen
});
}

 render(){

    const{isAuthenticated,user}=this.props.auth;

    const authLinks=(
        <Fragment>
          <NavItem>
              <span className="navbar-text mr-3">
                  <strong>{user?`Welcome ${user.email}`:``}</strong>
              </span>
          </NavItem>
          <NavItem>
            <Logout/>
         </NavItem> 
         <NavItem>
             <NavLink href="/form">form</NavLink>
         </NavItem>         
         <NavItem>
            <NavLink href="/draftform">draftform</NavLink>
         </NavItem>
        </Fragment>
    );
    
     const guestLinks=(
        <Fragment>
           <NavItem>
             <RegisterModal/>
             </NavItem>
             
            <NavItem>
                <LoginModal/>
             </NavItem>
        </Fragment>
    );
    
     return(
     <div>
         <Navbar color ="dark" dark expand="sm" className="mb-5">
             <Container>
                 <NavbarBrand href="/">Project</NavbarBrand>
                 <NavbarToggler onClick={this.toggle}/>
                 <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                         {isAuthenticated?authLinks:guestLinks}
                         
                     </Nav>
                 </Collapse>
             </Container>
           
         </Navbar>
     </div>
     );
 }
}
const mapStateToProps=state=>({
     auth:state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);