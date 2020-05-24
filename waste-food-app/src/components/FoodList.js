import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import * as moment from 'moment'

export default class FoodList extends Component {
    state = {
        FoodList: [],
        closeToExpirationFoodList: []
    }
    componentWillMount() {


        axios.get("http://localhost:3000/foodItems")
            .then(responce => {
                this.setState({ FoodList: responce.data })
                this.showAlert(this.state.FoodList);
            })
            .catch(error => {
                console.log(error)
            })
    }

    showAlert(foods) {
        console.log(localStorage.getItem('alert'))
        if (localStorage.getItem('alert') === 'false') {
            foods.forEach(element => {
                if (this.isCloseToExpire(element.expiration_date)) {
                    this.state.closeToExpirationFoodList.push(element.name);
                }
            });
            alert("following foods are close to expire: " + this.state.closeToExpirationFoodList);
            localStorage.setItem('alert', true);
        }
    }

    isCloseToExpire = (date) => {
        const now = moment();
        const expiration = moment(date);
        if (expiration.diff(now, 'days') < 5 && now < expiration) {
            return true;
        }
        return false;
    }

    isExpired = (date) => {
        const now = moment();
        const expiration = moment(date);
        if (now > expiration) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>

                <FoodListStyler>
                    <Navbar />
                    <div className="container">
                        <p className="lead food-list-heading">Available Items in my Fridge:</p>
                        <div className="flex-grid-thirds">
                            {
                                this.state.FoodList.map(item => {
                                    return (
                                        <div className={'col' + (this.isExpired(item.expiration_date) ? ' hidden' : '')}>
                                            <div className={'card mb-2'}>
                                                <div className={'header card-header card-header-custom' + (this.isCloseToExpire(item.expiration_date) ? ' card-header-warning' : ' card-header-custom')}>
                                                    <h5>{item.name}</h5>
                                                    <h5 className={(!this.isCloseToExpire(item.expiration_date) ? ' hidden' : '')}>&nbsp; - Expires soon</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p className="card-text">{item.description}</p>
                                                    <p className="expiry">Expiration Date:{item.expiration_date}</p>
                                                    <Link to={{ pathname: '/share', state: item.id }} className="btn card-share-button">Share it now!</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </FoodListStyler>
            </div>
        )
    }
}
const FoodListStyler = styled.div`
.header {
    display:flex;
}
.hidden {
    display: none
}
.card-header-custom{
    background:var(--myPurple);
    color:var(--darkGray);
    text-transform:uppercase;
}
.card-header-warning{
    background:var(--redWarning);
    color:var(--darkGray);
    text-transform:uppercase;
}
.card-share-button{
    background:var(--lightGreen);
    color:var(--darkGray);
    text-transform:uppercase; 
}
.expiry{
    color:var(--strongPurple);
    font-weight:bold;
}
.flex-grid-thirds {
    display: flex;
  flex-wrap: wrap;
}
.col {
    flex: 0 0 45%; /* explanation below */
  margin: 5px;
}
.carousel {
  //  height: 200px;
}
`