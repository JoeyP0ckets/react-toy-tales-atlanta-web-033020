import React, { Component } from 'react';

class ToyForm extends Component {
  
  render() {
    console.log(this.props)
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.props.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.props.newToy.name} onChange={this.props.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.props.newToy.image} onChange={this.props.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
