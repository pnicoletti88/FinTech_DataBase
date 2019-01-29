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

  //Write to Firebase DB:
  //will write to each individuals ID
  //not sure how to navigate into individual stock in the tree yet
  writeUserDataStock(ID, stock, price, date, shares) {
    ///users/ifLn2rp6VynduyBNe61b/stocks/GOOG
    firebase.database().ref('users/' + ID + '/stocks/' + stock + '/').set({
      date,
      price,
      shares
    }).then((data)=> {
      //success callback
      console.log('data', data)
    }).catch((error)=>{
      //error callback
      console.log('error', error)
    })
  }

  readStockInfo(ID, stock) {
    firebase.database().ref('nameOfDB/' + ID + '/' + stock + '/').once('value', function(snapshot) {
      console.log(snapshot.val())
    });
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
          
        </div>

  );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: '',
      stock: '',
      price: 0,
      date: '',
      shares: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  handleSubmit(event) {
    //writeUserDataStock(ID, stock, price, date, shares)
    // writeUserDataStock(this.state.ID, this.state.stock, this.state.price, this.state.date, this.state.shares);
    console.log(this.state.ID);
    console.log("Firebase DB updated");
  }

  render() {
    return (
      //currently calling onChange, should probably change to onSubmit
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>ID</label>
        <input type="text" name="ID" onChange={this.handleChange}/>

        <label>stock</label>
        <input type="text" name="stock" onChange={this.handleChange}/>

        <label>price</label>
        <input type="number" name="price" onChange={this.handleChange}/>

        <label>date</label>
        <input type="number" name="date" onChange={this.handleChange}/>

        <label>shares</label>
        <input type="number" name="shares" onChange={this.handleChange}/>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default App;
