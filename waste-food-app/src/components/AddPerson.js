import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Navbar from './Navbar'

export default class AddPerson extends Component {
    state={
        Name:"",
        Address:"",
        Email: ""
    }

    onChangeName=(e)=>{
        var name=e.target.value;
        this.setState({
            Name:name
        })   
    }
    onChangeEmail=(e)=>{
        var email=e.target.value;
        this.setState({
            Email:email
        })   
    }
    onChangeUserAddress=(e)=>{
        var userAddress=e.target.value
        this.setState({
            Address:userAddress
        })
    }

    onClickSubmit=(e)=>{
        e.preventDefault();
        const leggedUser = JSON.parse( localStorage.getItem( 'tokens' ) );
   
        const user={
            "userId":leggedUser.user.id,
            "name":this.state.Name,
            "email": this.state.Email,
            "address":this.state.Address,
        }
        console.log(user)
        axios.post("http://localhost:3000/addUser",user)
        .then(res=>{
            console.log(res.data);
            alert("New user Added!");
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <PersonStyler className="container">
                <Navbar/>
                  <p className="lead food-list-heading">Add Person Details:</p>
                <div className="form-group w-30">
                <label className="custom-label">Foodie's Nickname</label>
                <input value={this.state.Name} onChange={this.onChangeName} className="form-control input-custom"/>
                </div>
                <div className="form-group w-30">
                <label className="custom-label">Foodie's Email</label>
                <input value={this.state.Email} onChange={this.onChangeEmail} className="form-control input-custom"/>
                </div>
                <div className="form-group w-30">
                <label className="custom-label" >Address</label>
                <input value={this.state.Address} onChange={this.onChangeUserAddress} className="form-control input-custom" />
                </div>
                
                <button className="btn my-2 my-sm-0 submit-btn-custom" onClick={this.onClickSubmit}>Submit</button>
            
                </PersonStyler>
        )
    }
}
const PersonStyler=styled.div`
select{
    text-transform:uppercase;
    color:var(--darkGray);

}
option{
    text-transform:uppercase;
    color:var(--darkGray);
}

`