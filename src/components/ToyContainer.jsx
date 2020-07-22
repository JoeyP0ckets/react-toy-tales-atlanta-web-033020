import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  console.log(props)
  
  const renderToys = () => {
    return props.toyArray.map(toy => <ToyCard 
    id={toy.id}
    toy={toy}
    handleLike={props.handleLike}
    handleDelete={props.handleDelete}
    />)
  }
  
  
  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;
