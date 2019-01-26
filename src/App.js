import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider,database } from './firebase.js';


class TableRow extends Component{
  render(){

    return
  }
}

class Data extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      stocks: ""
    };
    this.build();
  }

  build() {
    database.ref("Users/aeyS4Uyw8fOh5CtjZYaAKIy7a133/Stocks").on('value', (snapshot) => {
      let list = [];
      let json;

      json = snapshot.toJSON();
      for (let key in json){
        let tempObj = { Name: "", Date: "", Price: "", Shares: "" };
        tempObj.Name = key;
        for (let key2 in json[key]){
          tempObj[key2] = json[key][key2];
        }

        list.push(tempObj)
      }
      this.setState({stocks:list});
    });

  }

  /*

  */

  render() {
    let x;
    if (this.state.stocks[0] != null){
      x = this.state.stocks.map((value) =>
        <li>{value.Name + " : " + value.Price + " : " + value.Date + " : " + value.Shares}</li>
      )
    }
    return (
        <div>
          <table>
            <ul>{x}</ul>
          </table>
        </div>

  );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Data />
        </header>
      </div>
    );
  }
}

export default App;
