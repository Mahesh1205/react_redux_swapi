import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { planetActions } from '../actions/planet.actions';


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value ? value.trim().toLowerCase() : '';
   return planetActions.getPlanetsData(inputValue);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>    
       <div>  
         <a>
         {suggestion.name} - {suggestion.population}
        </a>         
      </div>
  </div>
);

 class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.props.dispatch(planetActions.clearPlanetSuggestions());
  };
  onSuggestionsFetchRequested = ({ value }) => {
    // getSuggestions(value).then(data => {
    //   this.setState({ suggestions: data  });  
    // });
 }
  onSuggestionsClearRequested = () => {
    this.props.dispatch(planetActions.clearPlanetSuggestions());
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
       

    //  this.props.dispatch(planetActions.getSinglePlanet()); 
  }

  

  render() {
    const {  planetSuggestions , currentPlanet} = this.props;
    let value = this.state.value;
    const inputProps = {
      placeholder: 'Type a planet name',
      value,
      onChange: this.onChange
    };
    

    return (
      <div>
        <Autosuggest
              suggestions={[]}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={this.onSuggestionSelected}
         />
        { currentPlanet && <div> {'display user detail'}  </div>  }    

      </div>
    );
  }
      
  
}

function mapStateToProps(state) {
  return {
      planetSuggestions: state.planets.allPlanets,
      currentPlanet: state.planets.currentPlanet
  };
}

const connectedLoginPage = connect(mapStateToProps)(HomePage);
export { connectedLoginPage as HomePage };  