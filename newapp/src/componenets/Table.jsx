import React from 'react'
import './table.css'
export default function Table(props) {
  {props.players.sort((a,b)=> b.wins - a.wins)}
  return (
    <div>
    <table>
      <tr>
        <td>name</td>
        <td>wins</td>
        <td>looses</td>
        </tr>
        {props.players.map((val)=>{
          return <tr>
        <td>{val.name}</td>
        <td>{val.wins}</td>
        <td>{val.loose}</td>
          </tr>
        })}
      
    </table>
    </div>
  )
}
