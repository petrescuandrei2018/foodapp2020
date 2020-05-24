import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

export default class share extends Component {
    state = {
        FriendList: [],
        Friend: "",
        id: 1,
        shareUrl: "http://application.ro"
    }
    componentWillMount() {
        axios.get("http://localhost:3000/users", this.state.id)
            .then(response => {
                this.setState({ FriendList: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    onChangeFriend = (e) => {
        var id = e.target.value;
        this.setState({
            // Friend:name,
            id: id
        })
    }

    sendEmailAndDelete = (e) => {
        e.preventDefault();
        axios.delete("http://localhost:3000/foodItems/" + this.props.location.state)
            .then(response => {
                console.log(response);
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return (
            <ShareStyler className="container">
                <Navbar />
                <div className="row">
                    <div className="col-10 col-md-10 mx-auto text-center">
                        <h2 className="share-heading">Sharing is caring</h2>
                        <label className="custom-label" for="exampleFormControlSelect1">Select your buddy</label>
                        <select className="form-control input-custom text-center" onChange={this.onChangeFriend} value={this.state.x} id="exampleFormControlSelect1">
                            {
                                this.state.FriendList.map(friend => {
                                    return (
                                        <option selected value={friend.id}>{friend.name}</option>
                                    )
                                })
                            }

                        </select>
                        <button>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=https://antiwasteweb.web.app/foodItem/${this.props.location.state}`}  target="_blank">
                            Share on Facebook</a>
                        </button>
                    </div>
                </div>
            </ShareStyler>
        )
    }
}
const ShareStyler = styled.div`
    .share-heading{
        text-transform:uppercase;
        color:var(--darkGray);
        margin:20px 5px; 
    }
    .btn-share-custom{
        color:var(--darkGray) !important;
        background-color:var(--strongPurple) !important;
        border-radius:10px;
        padding:30px 20px;
        margin:10px;
    }
    .btn-share-custom:hover{
        background-color:var(--lightGreen) !important;
        color:var(--lightGray) !important;
        font-weight:bold;
    }
    select{
        text-transform:uppercase;
        color:var(--darkGray);
    
    }
    option{
        text-transform:uppercase;
        color:var(--darkGray);
    }
    
    `