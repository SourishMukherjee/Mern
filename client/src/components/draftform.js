import React, { Component, Fragment } from 'react';
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    NavItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
import screens from './screens';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
var dateFormat = require('dateformat');
class draftform extends Component{
    state={
        type:'',
        branch:'',
        name:'',
        desig:"",
        depart:"",
        empid:"",
        email:'',
        doj:'',
        emptype:'Permanent',
        software:'FS',
        reason:'',
        key:'',
        done:'',
        draft:'true',
        item: []
    }

    handlechange = (values,event) => {        // for combobox till the next @
        if(event!==null){
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        empid: a
      }, () => {
        axios.post('/api/draft',this.state)
        .then(res=>{
              var r = res.data;
              console.log(r);
            this.setState({
                type:r.Trans_Type,
                branch:r.Location,
                name:r.Emp_Name,
                desig:r.Emp_Designation,
                depart:r.Emp_Department,
                empid:r.Emp_ID,
                email:r.Emp_Email,
                doj:r.DOJ,
                emptype:r.Employee_Type,
                software:r.Software,
                reason:r.Reason,
                key:r.UserAccess_Headerkey,
                drafte:r.Draft
            })

            console.log(this.state)
        })

      });
  }
      if(event==null){
          this.setState({
             type:'',
             branch:'',
             name:'',
             desig:"",
             depart:"",
             empid:"",
             email:'',
             doj:'',
             emptype:'Permanent',
             software:'FS',
             reason:'',
             key:'',
             done:'',
             draft:'true',
          })
      }

  }

            componentDidMount(){
                axios.get('/api/draft')
            .then(res=>{
            this.setState({
                items:res.data
            })
            })

            }        // @

    handlechange1=(e)=>{
        const value=e.target.value;
        this.setState({[e.target.name]:value});
        console.log(value);
        // if(e.target.name==='empid'){
        //     this.getheader()
        //}
    }

    // getheader=()=>{
    //     var v='';
    //     axios.get('api/items/key')
    //     .then(res=>{
    //         v=res.data[0][''];
    //        // console.log(v);
    //         if(v==null){
    //            this.setState({
    //                key:1
    //            })
    //         }
    //         else {
    //             v=v+1
    //             this.setState({
    //                 key:v
    //             })
    //         }
    //     })
    // }

    onSubmit=(event)=>{

        //event.preventDefault();
        var now = new Date();
        this.setState({
            draft:'false'
          })
        const newItem={
            Trans_Type:this.state.type,
            Location:this.state.branch,
            Emp_Name:this.state.name,
            Emp_Designation:this.state.desig,
            Emp_Department:this.state.depart,
            Emp_ID:this.state.empid,
            Emp_Email:this.state.email,
            DOJ:this.state.doj,
            Employee_Type:this.state.emptype,
            Software:this.state.software,
            Reason:this.state.reason,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            UserAccess_Headerkey:this.state.key,
            Draft:this.state.draft
        }

        axios.post('api/draft/save',newItem)
          .then(res=>{
            console.log(res);
            this.setState({
                done:'yes',
                // draft:'false'
              })
          })



    }

    render(){
        if(this.state.empid&&this.state.done=='yes'){
            return <Redirect to='/form/screens'/>
        }
        const filterOptions1 = createFilterOptions({   //for combo box till the next @
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
        return(
            <div className="container">
                <Autocomplete
            id="EmpId"
            options={this.state.items}
            getOptionLabel={(option)=>option.Emp_ID}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            //disabled={this.state.boola}
            renderInput={(params)=><TextField {...params} label="EmpId" variant="outlined"/>}
            />                                        {/* @ */}
                <Form onSubmit={this.onSubmit}>
                <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-5">FS User Access Request type:</legend>
                            <Col sm={10}>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="type" value="New User creation"   checked={this.state.type==='New User creation'} onChange={this.handlechange1}/>
                                   New user creation
                                    </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="type" value="Changes required" checked={this.state.type==='Changes required'} onChange={this.handlechange1}/>
                                    Changes required
                                    </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="type" value="Deletion required" checked={this.state.type==='Deletion required'} onChange={this.handlechange1}/>
                                     Deletion required
                                    </Label>
                                </FormGroup>
                                    </Col>
                                </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-3">Branch</legend>
                            <Col sm={10}>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="Marketing" checked={this.state.branch==='Marketing'} onChange={this.handlechange1}/>
                                    Marketing
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="SCM" checked={this.state.branch==='SCM'} onChange={this.handlechange1}/>
                                    SCM
                                    </Label>
                                    </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="MFG-Hosur Rd Plant" checked={this.state.branch==='MFG-Hosur Rd Plant'} onChange={this.handlechange1}/>
                                     MFG-Hosur Rd Plant
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="MFG-jigani Rd plant" checked={this.state.branch==='MFG-jigani Rd plant'} onChange={this.handlechange1}/>
                                     MFG-Jigani Rd Plant
                                    </Label>
                                </FormGroup>
                                    </Col>
                                </FormGroup>
                       <FormGroup row>
                          <Label for="name" sm={3}>FS Username:</Label>
                           <Col sm={5}>
                             <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handlechange1} />
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" id="desig" value={this.state.desig} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="depart" sm={3}>Department:</Label>
                           <Col sm={5}>
                             <Input type="text" name="depart" id="depart" value={this.state.depart} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="emp_id" sm={3}>Employee Id:</Label>
                           <Col sm={5}>
                             <Input type="text" name="empid" id="empid" value={this.state.empid} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label for="doj"sm={3}>Date of Joining</Label>
                             <Col sm={5}>
                                   <Input
                                     type="date"
                                      name="doj"
                                      id="doj"
                                      value={this.state.doj}
                                      onChange={this.handlechange1}
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="emptype" sm={3} >Employee Type</Label>
                              <Col sm={5}>
                                  <Input type ="select" name="emptype" id="emptype" onChange={this.handlechange1} value={this.state.emptype}>
                                      <option value="Permanent">Permanent</option>
                                      <option value="Temperory">Temperory</option>
                                      <option value="Apprentice">Apprentice</option>
                                      <option value="Others">others</option>
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="software"sm={3}>Software</Label>
                            <Col sm={5}>
                            <Input type="select" name="software" id="Software" onChange={this.handlechange1} value={this.state.software}>
                               <option value='FS'>FS</option>
                               <option value='SS'>SS</option>
                               <option value='Focus'>Focus</option>
                                <option value='Invoicing'>Invoicing</option>
                                <option value="others">Others</option>
                             </Input>
                             </Col>
                            </FormGroup>
                            <FormGroup row>
                               <Label for="exampleText"sm={3}>Reason</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="reason" id="reason" value={this.state.reason} onChange={this.handlechange1}/>
                               </Col>
                            </FormGroup>
                            <FormGroup check row>
                               <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save and Next</Button>
                                   </Col>
                                 </FormGroup>
                          </Form>
            </div>
        );
    }
}

  export default (draftform);