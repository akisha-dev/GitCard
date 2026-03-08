import {useState} from 'react';

function App(){
  let [userInfo,setUserInfo]=useState(null);

  async function getInfo(){
  if(!username){
    alert('please enter a username!')
  return;}

let response=await fetch(`https://api.github.com/users/${username}`);
let stats = await response.json();
console.log(stats);
setUserInfo(stats);



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


  { userInfo && (
  <div className='container-card'>
  <div className='social'>
 {!userInfo.email?null:<p>{userInfo.email}</p>}
  {!userInfo.blog?null:<p>{userInfo.blog}</p>}
  {!userInfo.twitter_username?null:<p>{userInfo.twitter_username}</p>}
  </div>
  <div className='bio'>
  <img src ={userInfo.avatar_url} />
  <p>{userInfo.name}</p>
 {!userInfo.bio?null:<p>{userInfo.bio}</p>}
  </div>
  <div className='github-info'>
 {!userInfo.location?null:<p>{userInfo.location}</p>}
  {!userInfo.company?null:<p>{userInfo.company}</p>}
  {!userInfo.public_repos?null:<p><a 
  href={`https://github.com/${userInfo.login}?tab=repositories`}>
  {userInfo.public_repos}</a></p>}
  
</div></div> )}
</>
)
}
export default App