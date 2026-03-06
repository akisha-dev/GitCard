import {useState} from 'react';

function App(){
  async function getInfo(){
  if(!username){
    alert('please enter a username!')
  return;}

let response=await fetch(`https://api.github.com/users/${username}`);
console.log(response.json());


  }

  let[username,setUsername]=useState('');
  
  return(
  <>
<h1>Enter a username to get the Analytics</h1>
<input type='text'
placeholder='username'
onChange={(event) => {
  setUsername(event.target.value)
}}/>
<button onClick={()=>{
  console.log(username)
  getInfo();
}}>Search</button>
</>
  )}
 export default App