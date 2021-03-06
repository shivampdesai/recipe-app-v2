//Author: Shivam Desai 

import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      recipeCount: 0,
      recipes: [],
      ingredients: []
    };
  }//constructor()

  getRecipes(){
    var newIngredient = document.getElementById('ingredient').value

    this.setState({
      ingredients: this.state.ingredients.concat(newIngredient)
    });

    var url = 'https://www.food2fork.com/api/search?key='YOUR-API-KEY-HERE'=';

    for (var i = 0; i < this.state.ingredients.length; i++){
      url+=(this.state.ingredients[i] + ',');
      console.log(this.state.ingredients[i]);
    }

    url+=newIngredient;

    console.log("Request URl: " + url);

    fetch(url)
     .then((response) => {
       return response.json();
     })
     .then((data) => {
       this.setState({
         recipeCount: data.count,
         recipes: data.recipes
       });

       console.log(data);
     })
  } //getRecipes()

  render() {

    let current_recipes = this.state.recipes;
    let current_ingredients = this.state.ingredients;

    return (
      <div className="App">
        <h1>Find recipes with the ingredients in your fridge!</h1>

        <h4> Enter an ingredient </h4>
        <div>
        <input type="text" name="ingredient" id="ingredient"/>
        </div>

        <div>
          <button onClick={() => this.getRecipes()}>Add Ingredient</button>
        </div>

        <div>
          {current_ingredients.map(i => <div><h4>{i}</h4></div>)}
        </div>

        <div>
          {current_recipes.map(res => <div> <h2><a href={res.source_url}> {res.title} </a> </h2> <img src={res.image_url}/> </div>)}
        </div>

      </div>
    );
  }//render()
}

export default App;
