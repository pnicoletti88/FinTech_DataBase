import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider, database, db } from './firebase.js';


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
          
        </div>

  );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  state = {
    ID: '',
    stock : '',
    price : 0,
    date : '',
    shares : 0
  }

  //Write to Firebase DB:
  //will write to each individuals ID
  //not sure how to navigate into individual stock in the tree yet
  writeUserDataStock(ID, stock, price, date, shares) {

    var docData = {
      price,
      date,
      shares
    };

    db.collection("users").doc(ID).collection("stocks").doc(stock).set(docData).then(function() {
      console.log("Document successfully written to");
    });
  }

  readStockInfo(ID, stock) {
    var docRef = db.collection("users").doc(ID).collection("stocks").doc(stock);

    docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data: ", doc.data());
      }
      else {
        //doc.data() will be undefined here
        console.log("No such stock information!");
      }
    }).catch(function(error) {
      console.log("Error retrieving document: ", error);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //When submit button is pressed it will take the data (which has been changed already by the handleChange handler)
  //and send as inputs to the fn writeUserDataStock
  //Think there is a problem with my handlers though because it's not writing to the DB
  handleSubmit = (event) => {
    /*
    FYI you can use submit and have the first line of code in you handle submit function be:
      event.preventDefault();
    It would be able to handle the same functionality here
     */

    //This works now! changed the button to a dumb button form and used onClick instead of submit
    //this will also overwrite data if it already exists!
    this.writeUserDataStock(this.state.ID, this.state.stock, this.state.price, this.state.date, this.state.shares);
    console.log("Firebase DB updated");
  }

  handleRead = (event) => {
    console.log("Read called successfully!");
    this.readStockInfo(this.state.ID, this.state.stock);
  }

  render() {
    return (
      //currently calling onChange, should probably change to onSubmit
      <form >
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

        <button type="button" onClick={this.handleSubmit}>Submit</button>

        <button type="button" onClick={this.handleRead}>Get</button>
      </form>
    );
  }
}

export default App;
