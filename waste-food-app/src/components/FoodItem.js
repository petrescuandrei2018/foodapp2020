import React, { Component } from 'react'
import axios from 'axios'
import * as moment from 'moment'
import styled from 'styled-components'
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import img from './../assets/images/1.jpeg'
import { Carousel } from 'react-responsive-carousel'

export default class FoodItem extends Component {
    state = {
        food: {},
        name: ''
    }
    componentWillMount() {
        console.log(this.props.match.params.id)
        axios.get("http://localhost:3000/foodItems/")
            .then(response => {
                this.setState({ food: response.data.find(food => food.id == this.props.match.params.id) })
            })
            .catch(error => {
                console.log(error)
            })
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
                <FoodStyler>
                    <div className={'col' + (this.isExpired(this.state.food.expiration_date) ? ' hidden' : '')}>
                        <div className={'card mb-2'}>
                            <div className={'header card-header card-header-custom' + (this.isCloseToExpire(this.state.food.expiration_date) ? ' card-header-warning' : ' card-header-custom')}>
                                <h5>{this.state.food.name}</h5>
                                <h5 className={(!this.isCloseToExpire(this.state.food.expiration_date) ? ' hidden' : '')}>&nbsp; - Expires soon</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{this.state.food.description}</p>
                                <p className="expiry">Expiration Date:{this.state.food.expiration_date}</p>
                            </div>
                        </div>
                    </div>

                </FoodStyler>
                <Carousel className="carousel" autoPlay infiniteLoop="true" centerMode="true">
                        <div >
                            <img src={require("./../assets/images/img1.jpg")} />
                            <p className="legend">healthy living</p>
                        </div>
                        <div>
                            <img src={require("./../assets/images/img2.jpg")} />
                            <p className="legend">sharing is carring</p>
                        </div>
                        <div>
                            <img src={require("./../assets/images/img3.jpg")} />
                            <p className="legend">anti waste</p>
                        </div>
                        <div>
                            <img src={require("./../assets/images/img4.jpg")} />
                            <p className="legend">save the planet</p>
                        </div>
                        <div>
                            <img src={require("./../assets/images/img5.jpg")} />
                            <p className="legend">balance</p>
                        </div>
                    </Carousel>
            </div>
        )
    }
}

const FoodStyler = styled.div`
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