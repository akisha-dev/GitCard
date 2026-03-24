import bgImage from "./assets/github.svg";
import {useState} from 'react';
import xIcon from "./assets/twitter-x.svg"
import linkIcon from "./assets/link.svg";
import mail from "./assets/envelope.svg";
import map from "./assets/map.svg"

function App(){
  let [userInfo,setUserInfo]=useState(null);

  async function getInfo(){
  if(!username){
    alert('please enter a username!')
  return;}

let response=await fetch(`https://api.github.com/users/${username}`);
let stats = await response.json();
console.log(stats);
if(!response.ok){
  alert('User not found!');
  return;
}

setUserInfo(stats);

  }
   async function getLanguage(repos){
    let response1 = await fetch(`https://api.github.com/users/${username}/repos`);

repos =await response1.json();
console.log(repos);
  let counts = {};
  repos.forEach(element => {
    if(element.language){
      counts[element.language] = (counts[element.language] || 0) + 1
    }

    
  });
  setLanguage(counts);
 let recentWork = repos.sort((a,b)=>
 new Date(b.updated_at)- new Date(a.updated_at)
 ).slice(0,3);
 setRecentWork(recentWork);
  
}

  

  let[username,setUsername]=useState('');
  let[language,setLanguage] = useState({});
  let[recentWork,setRecentWork]=useState([]);
  
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

{userInfo &&
<div className="container-card">
  {!userInfo.avatar_url? null :
  <img src={userInfo.avatar_url}></img>}
  {
    !userInfo.name?null:<p>{userInfo.name}</p>
  }
  {
    !userInfo.bio?null:<p>{userInfo.bio}</p>
  }
    {
    !userInfo.location?null:<p>{userInfo.location}</p>
  }
    {
    !userInfo.company?null:<p>{userInfo.company}</p>
  }

    {
    !userInfo.email?null:<p>{userInfo.email}</p>
  }
    {
    !userInfo.twitter_username?null:<p>{userInfo.twitter_username}</p>
  }
    {
    !userInfo.blog?null:<p>{userInfo.blog}</p>
  }
    {
    !userInfo.html_url?null:<p>{userInfo.html_url}</p>
  }
 <div>Languages used:{
  Object.keys(language).slice(0,3).map((lang)=>{
  const LanguageMap ={
    'C++':'cplusplus',
    'Jupyter Notebook':'jupyter',
     'HTML':'html5',
     'CSS':'css3',
  }
  const IconName = LanguageMap[lang] ||lang.toLowerCase();
 return(
 <div key={lang}>
    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${IconName}/${IconName}-original.svg`
    }width="20px"
     height="20px"
     onError={(e) => e.target.style.display='none'}></img>
     <p>{lang}</p>
  </div>

  )
  


})

 }</div>

  <p>Recent works:</p>
   {recentWork.map((repo)=>{
    return(
      <div key={repo.id}>
       <div> <p>{repo.name}</p>
        <img src ={linkIcon}
        height="20px"
        width="20px">
        </img></div>

        <p>{repo.description}</p>
        <p>forks:{!repo.fork?null:repo.forks}</p>
        <p>⭐{repo.stargazers_count}</p>
      
      </div>
    )
   })

   }

  
 
 
  </div>
}
 
  </>
  )}
  export default App
