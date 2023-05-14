import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Table from './Table';
import './homePage.css'

export default function HomePage(props) {
     const[name,setName] = useState('');
     const[table,setTable] = useState(true)

     const nev=useNavigate()

const sTable = ()=>{
   if(table == true)
   return<Table players = {props.players} player= {props.player}/>
}
     const validName = async ()=>{
        
        if(name.length > 0)
            {

             await   props.start(name);
             nev('/gamePage')
            }

         else{
            alert('error');
        }
     }
     
  return (
    <div id='main' style={{marginLeft:'18%' ,borderRadius:'5px', width: '60%',height:'17cm', marginTop:'1.6cm' }}>
        <p style={{paddingTop:'1.2cm'}} className='h1'>Ready for War</p>
         <input class="c-checkbox" type="checkbox" id="checkbox"/>
<div class="c-formContainer">
  <form style={{marginTop:'0.6cm'}} class="c-form" action="">
    <input onChange={(e)=>{setName(e.target.value)}} class="c-form__input" placeholder="UserName" type="text" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required/>
    <label class="c-form__buttonLabel" for="checkbox">
      <button onClick= {validName} class="c-form__button" type="button">Start</button>
    </label>
    <label style={{}} class="c-form__toggle" for="checkbox" data-title="Click for SignIn"></label>
  </form>
</div>
<a style={{marginTop:'3cm'}} onClick={()=>{setTable(!table)}} href="#" class="again">Table</a>
         {sTable()}
    </div>
  )
}
