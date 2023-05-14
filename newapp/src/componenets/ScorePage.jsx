import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './scorePage.css'

export default function ScorePage(props) {
    const nev=useNavigate() 
    
    const backtoHome=()=>{
        nev('/')
    }

    const backToGame=()=>{
     props.newGame()
        nev('/gamePage')
    }

    const check=()=>{
        if(props.player.lastGame == 1)
            return 'win';
        if(props.player.lastGame == 0)
            return 'loose';
        if(props.player.lastGame == 2)
        return 'draw';
    }

    Math.floor(Math.random() * props.player.cardArr)
    const showScore = ()=>{
        return <h2 style={{color: 'rgb(243, 240, 231)'}}>Looses:{props.correntPlayer.loose} - {props.correntPlayer.wins}:Wins </h2>
    }
  return (
    <div id='main' style={{marginLeft:'18%',height:'80vh',borderRadius:'5px', width: '60%', marginTop:'1.9cm' }}>
        <button className='again' style={{marginLeft:'80%',marginTop:'1cm', width:'7%',height:'1cm'}} onClick={backtoHome}>X</button>
        <p style={{marginTop:'1.4cm'}} className='h1'>{check()}</p>
        {showScore()}
       
        <button style={{marginTop:'1.4cm'}} onClick= {backToGame} className='again'  type="button">Again</button>
    </div>
  )
}