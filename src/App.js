import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'
import toyData from './data';


class App extends React.Component{

  baseURL = "http://localhost:3000/toys"
  state = {
    display: false,
    toyArray: [],
    newToy:{
    name: '',
    image: '',
    likes: 0,
  }
  }
  
  componentDidMount(){
    fetch(this.baseURL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        toyArray: data
      })
    })
  }
  
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleChange = e => {
    this.setState({
      newToy: { ...this.state.newToy, [e.target.name]: e.target.value}
    })
  }

  handleLike = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: this.state.toyArray.find(toy => toy.id === id).likes + 1
      })
    })
      .then(resp => resp.json())
        .then(updatedToy => {
          let targetToyIndex = this.state.toyArray.findIndex(toy => toy.id === updatedToy.id)
          let copyToyArray = [...this.state.toyArray]
          copyToyArray[targetToyIndex] = updatedToy
          this.setState({
            toyArray: copyToyArray
          
        })
      })
  }

  handleDelete = (id) => {
    fetch (`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
    })
      this.setState({
        toyArray: [...this.state.toyArray.filter(toy => toy.id !== id)]
      })
      
  }
  
  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify(this.state.newToy)
      })
        .then(resp => resp.json())
        .then(newToy => {
          this.setState({
            toyArray: [...this.state.toyArray, newToy]
          })
        })

  }

  render(){
    console.log(this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm 
            newToy={this.state.newToy}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        toyArray={this.state.toyArray}
        handleLike={this.handleLike}
        handleDelete={this.handleDelete}
        />
      </>
    );
  }

}

export default App;
