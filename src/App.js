import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  //refactor: automatically moved to inside the constructor.
  state = { 
    manager: '',
    players: [],
    balance: '',
    value: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); //Don't have to call a specific account, because Metamask will call whichever account currently selected.
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); //Big number object

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => { //Binds this to our component
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({ 
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
        This contract is managed by {this.state.manager}.
        There are currently {this.state.players.length} people entered, 
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value} 
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
