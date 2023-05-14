import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import HomePage from './componenets/HomePage';
import { useState,useEffect } from 'react';
import GamePage from './componenets/GamePage';
import ScorePage from './componenets/ScorePage';

let player, computer;
function App() {
  const[players,setPlayers]=useState([]);
  const[getDataFlag,setFlag]=useState(false);
  const[correntPlayer,setCorrentPlayer]=useState(null)


  useEffect(()=>{
    fetch('/players').then((res)=>{return res.json()}).then((data)=>{
      setPlayers(data);
    })
  },[getDataFlag]);

  const initGame = async (user) => {
    const response = await fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user })
    });
  
    const data = await response.json();
    setFlag(!getDataFlag);
    if (data.message === 'ok' || data.message === 'User already exists') {
      let compDeck = [], playerDeck = [];
  
      let cardDeck = new CardDeck();
      for (let i = 0; i < 26; i++) {
        compDeck.push(cardDeck.dealCard());
        playerDeck.push(cardDeck.dealCard());
      }
      
      player = new Player(user, playerDeck);
      if(data.message === 'ok'){
        setPlayers([...players, player]);
        setCorrentPlayer(player)
      }
      // Always create a new computer player
      computer = new Player('computer', compDeck);
    }
    
    players.map((val)=>{
      if(val.name==user){
        console.log(val);
        setCorrentPlayer(val);
        alert('Welcome back, continuing with old user');
       }
      })
    // console.log(player)
    // console.log(computer)
  };
  
  
  

  const dealNewCard=()=>{
    let compDeck = [], playerDeck = [];
    
    let cardDeck = new CardDeck();
    for(let i =0; i< 26; i++)
    {
      compDeck.push(cardDeck.dealCard());
      playerDeck.push(cardDeck.dealCard());
    }
    player.cardArr = playerDeck;
    computer.cardArr = compDeck
  }

  return (
    <div className="App">
<BrowserRouter>
<Routes>
<Route path='/' element={<HomePage correntPlayer={correntPlayer} start={initGame}  player={player} players={players}/>}/>
<Route path='/gamePage' element={<GamePage getDataFlag={getDataFlag} setFlag={setFlag} correntPlayer={correntPlayer} player = {player} computer ={computer}/>}/>
<Route path='/scorePage' element={<ScorePage correntPlayer={correntPlayer} player ={player} computer ={computer} newGame = {dealNewCard}/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;

class Player{

  wins = 0;
  loose = 0;
  games = 0;
  lastGame = 0;

constructor(name,cardArr){
  this.name = name;
  this.cardArr = cardArr;
}
getTableInfo() {
  let wins = this.wins, loose = this.loose, name = this.name ;
  
  return {name,wins,loose};
 }
}

class CardDeck{
  cards = [];

  constructor(){
    this.initCard()
  }

  initCard(){
    for(let i = 1; i<14; i++)
    {
      for(let j=0 ; j<4 ; j++)
      {
        this.cards.push(i);
      }
    }
  }

 dealCard(){
    let rand = Math.floor(Math.random() * this.cards.length);
    let card = this.cards.splice(rand,1);
    return card[0];
  }
}