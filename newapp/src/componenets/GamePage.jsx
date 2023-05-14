import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card';
import './gamePage.css'


let playerPoint = 0 , computerPoint =0;



export default function GamePage(props) {
    const[index,setIndex] =useState(1);
    const nev=useNavigate()

    const updateUserStats = async (name, wins, loose) => {      
          const response = await fetch('/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, wins, loose }),
          });
          props.setFlag(!props.getDataFlag);
          const data = await response.json();
          console.log(data.message); 
      };
      
    
    const checkScore=()=>{
        if(props.computer.cardArr[index] > props.player.cardArr[index])
            computerPoint++;
        else if(props.computer.cardArr[index] < props.player.cardArr[index])
            playerPoint++;
           

        console.log(computerPoint,playerPoint, 'round:'+ index);
        if(index == 25)
        {
         
            props.player.games++;
         
            if(computerPoint > playerPoint)
            { 
                props.correntPlayer.loose++;
                props.player.lastGame = 0;
                updateUserStats(props.player.name, props.player.wins=props.correntPlayer.wins, props.player.loose=props.correntPlayer.loose);
            }
            if(computerPoint < playerPoint)
            {
                props.correntPlayer.wins++;
                props.player.lastGame = 1;
                updateUserStats(props.player.name, props.player.wins=props.correntPlayer.wins, props.player.loose=props.correntPlayer.loose);
            }
            else if(computerPoint==playerPoint){
                props.player.lastGame=2;
                alert('draw')
            }
            console.log(props.player.loose);
            console.log(props.player.wins);
            playerPoint = 0;
            computerPoint = 0;
  nev('/scorePage')
            
        }
        else{

            setIndex(index+1);
        }
      
    }

   
  return (
    <div id='main' style={{ marginLeft:'10%',width: '80%',height:'100vh',backgroundColor:'black',borderRadius:'5px' }}>
        <div style={{display:'flex',justifyContent:'space-around'}}>
            <div className='points'>
            <h2 style={{color:'rgb(243, 240, 231)',fontSize:'23px',marginTop:'4.5px'}} >{'Player Point: '+ playerPoint}</h2>
            </div>    
            <div id='round'>
            <h2 style={{color:'rgb(54, 53, 53)',fontSize:'25px',marginTop:'4.5px'}}>{'R.N:'+ index}</h2>
            </div>               
            <div className='points'> 
            <h2 style={{color:'rgb(243, 240, 231)',fontSize:'21px',marginTop:'4.5px'}}> {'Computer Point: '+ computerPoint}</h2>
            </div>
            </div>
            <div style={{border:'3px solid rgb(243, 240, 231)',width:'10%',borderRadius:'48%',marginLeft:'44.2%',marginTop:'0.4cm',marginBottom:'0.4cm'}}>
        <h3 className='h2' style={{marginBottom: '20px',color:'rgb(243, 240, 231)'}}>computer</h3>
            </div> 
        <div  className='cards'>
            <Card  num= {props.computer.cardArr[index]} arr= {props.computer.cardArr}/> 
            
            <Card num= {props.player.cardArr[index]} arr= {props.player.cardArr} point={playerPoint}/>
        </div>
        <div style={{border:'3px solid rgb(243, 240, 231)',width:'10%',borderRadius:'48%',marginLeft:'45%',marginBottom:'0.4cm'}}>
        <h3 className='h2' style={{color:'rgb(243, 240, 231)'}}>{props.player.name}</h3>
        </div>
        <a style={{}} onClick={checkScore} href="#" id="war">WAR</a>
    </div>

  )
}