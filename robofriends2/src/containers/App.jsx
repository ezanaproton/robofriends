import React, {Component} from "react";
// import { robots } from "./robots";
// import {robots} from "https://jsonplaceholder.typicode.com/users";
import CardList from "../components/CardList";
import Searchbox from "../components/Searchbox";
import "./App.css";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";


class App extends Component{
    constructor(){
        super();
        this.state={
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{return response.json();})
        .then(users=>{this.setState({robots: users})
        })
    }
    onSearchChange=(event)=>{
        // take input fron searchchange and use it to filter robots
        this.setState({searchfield: event.target.value});
    }
    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        return (!robots.length)? 
        <h1 className="tc">Loading...</h1>:
            (<div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <ErrorBoundary><Scroll><CardList robots = {filteredRobots}/></Scroll></ErrorBoundary>
            </div>);
        }
    };

export default App;