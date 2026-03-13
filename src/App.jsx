import bgImage from "./assets/github.svg";
import {useState} from 'react';

function App(){
  let [userInfo,setUserInfo]=useState(null);

  async function getInfo(){
  if(!username){
    alert('please enter a username!')
  return;}

let response=await fetch(`https://api.github.com/users/${username}`);
let stats = await response.json();

setUserInfo(stats);

  }
   async function getLanguage(repos){
    let response1 = await fetch(`https://api.github.com/users/${username}/repos`);

repos =await response1.json();
  let counts = {};
  repos.forEach(element => {
    if(element.language){
      counts[element.language] = (counts[element.language] || 0) + 1
    }

    
  });
  setLanguage(counts);
  
}

  

  let[username,setUsername]=useState('');
  let[language,setLanguage] = useState({});
  
  return(
  <>
  <div className='upper h-64 border-[2px]  relative'  style={{background: 'linear-gradient(135deg, #0f172a 0%, #0e7490 50%, #0f172a 100%)'}}>

      <img  className='h-64  w-full z-0' src={bgImage}></img>
 
<h1 className='text-6xl
text-cyan-200   z-10 absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2

'>GitCard</h1>
</div>
<h2 className='flex flex-col items-center  mt-12
text-white
text-2xl
'>Enter a username to generate a Card</h2>
<div className='mt-12
flex
flex-row
items-center
justify-center'>
<input  
className='
border-[2px]
border-gray-400
rounded-lg
bg-white
mr-[30px]
p-[5px]
pl-[6px]
shadow-2xl
text-black
w-[250px]
'
type='text'

placeholder='username'
onChange={(event) => {
  setUsername(event.target.value)
}}/>
<button className='
rounded-md
border-[2px]
p-[6px]
w-[70px]
bg-white
text-gray-500
bg-cyan-500

' onClick={()=>{
  console.log(username)
  getInfo();
  getLanguage();
}}>Search</button>
</div>

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
  {Object.keys(language).slice(0,4).map(lang =>{
    const languageMap = {
      'C++':'cplusplus',
      'C#':'csharp',
      'Jupyter Notebook':'jupyter',
    }
    const iconName = languageMap[lang]|| lang.toLowerCase();
    return(
       <div key={lang}>
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`}
        alt={lang}
        width="30"
         onError={(e) => e.target.style.display = 'none'}
      />
      <p>{lang}</p>
    </div>
  )
})}
</div></div> )}
</>
)
}
export default App