import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Navbar from './Navbar'

export default class AddFoodItem extends Component {
    state = {
        name: "",
        itemCategories: [],
        categoryId: "",
        description: "",
        expirationDate: ""
    }

    componentWillMount() {
        axios.get("http://localhost:3000/categories")
            .then(responce => {
                this.setState({ itemCategories: responce.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    onChangeName = (e) => {
        var name = e.target.value;
        this.setState({
            name: name
        })
    }
    onChangeCategory = (e) => {
        var category = e.target.value;
        this.setState({
            categoryId: category
        })
    }
    onChangeDescription = (e) => {
        var desc = e.target.value
        this.setState({
            description: desc
        })
    }
    onChangeExDate = (e) => {
        const exDate = e.target.value;
        this.setState({
            expirationDate: exDate
        })
    }
    onClickSubmit = (e) => {
        e.preventDefault();
        
        const user = JSON.parse( localStorage.getItem( 'tokens' ) );

        const foodItem = {
            "userId": user.user.id,
            "name": this.state.name,
            "description": this.state.description,
            "categoryId": this.state.categoryId,
            "expirationDate": this.state.expirationDate
        }
        console.log(foodItem)
        axios.post("http://localhost:3000/addFoodItem", foodItem)
            .then(res => {
                alert("New food Added!");
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <AddItemStyler className="container">
                <Navbar/>
                <p className="lead food-list-heading">Add Food Item:</p>
                <div className="form-group w-30">
                    <label className="custom-label" for="exampleFormControlInput1">Item Name</label>
                    <input type="email" value={this.state.itemName} onChange={this.onChangeName} className="form-control input-custom" id="exampleFormControlInput1" />
                </div>
                <div className="form-group w-30">
                    <label className="custom-label" for="exampleFormControlSelect1">Select Food Category</label>
                    <select className="form-control input-custom" onChange={this.onChangeCategory} value={this.state.itemCategory} id="exampleFormControlSelect1">
                        {
                            this.state.itemCategories.map(item => {
                                return (
                                    <option selected value={item.id}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div class="form-group w-30">
                    <label className="custom-label" for="exampleFormControlTextarea1">Item Description</label>
                    <textarea class="form-control input-custom" value={this.state.value} onChange={this.onChangeDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group w-30">
                    <label className="custom-label">Expiration Date</label>
                    <input value={this.state.expirationDate} onChange={this.onChangeExDate} className="form-control input-custom" placeholder="mm-dd-yyyy" />
                </div>
                <button className="btn  my-2 my-sm-0 submit-btn-custom" onClick={this.onClickSubmit}>Add Item</button>


            </AddItemStyler>
        )
    }
}
const AddItemStyler = styled.div`
select{
    text-transform:uppercase;
    color:var(--darkGray);

}
option{
    text-transform:uppercase;
    color:var(--darkGray);
}
.navbar-btn-custom{
    background:var(--myPurple);
    color:var(--darkGray);
    margin:0px 5px;
  }
.navbar-btn-custom:hover{
    background:var(--lightGreen);
    color:var(--lightGray);
  }

`
