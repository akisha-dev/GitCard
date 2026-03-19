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

  { userInfo && (
  <div className='container-card
  
  max-w-2xl mx-auto
  grid
  grid-cols-2
  gap-4
  items-start
  m-[30px]
  pl-[15px]
  pr-[10px]
  pb-[15px]
  pt-[15px]
  border-[2px]
  bg-gray-900 
   border-gray-700'>
  <div className='grid1
  mt-8
  flex
  align-center
  justify-center 
  text-md
  
pr-6
  p-8
'>
  <div className='bio space-y-4'>
  <img 
  className=' h-[180px] 
  w-[180px] 
  rounded-full
  shadow-[0_0_20px_rgba(0,200,255,0.3)]
  ' 
  src ={userInfo.avatar_url} />
  <p
  className="
  text-center
  text-xl
  text-white">{userInfo.name}</p>
  {!userInfo.bio?null:<p
  className="
  text-center
  text-gray-300
"
  >{userInfo.bio}</p>}

 
  
  <div className='social
   space-y-4  
  text-center
  text-gray-300
"'>
  {!userInfo.location?null:<div className="flex items-center gap-2">
  <img
  className="
  invert
  h-[25px]
  w-[20px]
  " src={map}></img>
  <p>{userInfo.location}</p>
  </div>}

  {!userInfo.company?null:<p>company : {userInfo.company}</p>}
     {!userInfo.email?null:<div className="flex items-center gap-2">
  <img
  className="
  invert
  h-[25px]
  w-[20px]
  " src={mail}></img>
  <p> : {userInfo.email}</p>
  </div>}
  {!userInfo.blog?null:
  <div className="flex gap-3 items-center "><span className="text-gray-400">blog:</span>
    <a href={userInfo.blog} 
    target="_blank"
    rel="noreferrer">
      <img
      src={linkIcon}
      className='
      h-[20px]
      w-[20px]
      invert'></img>
    </a></div>}
  {!userInfo.twitter_username?null:
   <div className="flex items-center gap-2">
  <img
  className="
invert
  h-[15px]
  w-[15px]
  " src={xIcon}></img>
  <p> : {userInfo.twitter_username}</p>
  </div>}
  </div></div></div>
  <div className='grid2
  
    mt-8
  flex
  align-center
  justify-center 
  text-md
 border-l
  border-gray-700 
  pl-6
  p-8
  '>


  <div className='github-info
  space-y-2 
  '>
  <div className="github
  flex
  gap-2
  items-center
  text-gray-400
  ">
    github link :
    <a href={userInfo.html_url}
    target="_blank" rel="noreferrer"><img
    src={bgImage} width="20px"
    height='20px'
    className="invert"></img></a>
  </div>
  <div className="text-gray-300">
 
</div>
  {!userInfo.public_repos?null:
  <div className="repos
  flex 
  items-center
  gap-2
  text-cyan-400">
  <span className="text-gray-400"> Public Repos </span>: {userInfo.public_repos} 
  <a href={`https://github.com/${userInfo.login}?tab=repositories`}
  target="_blank"
  rel="noreferrer">
   <img 
  className="
  h-[20px]
  w-[20px]
  invert" 
  src={linkIcon}></img>
  </a></div>}
   <p className="text-gray-400">Languages used:</p>
  {Object.keys(language).slice(0,4).map(lang =>{
    const languageMap = {
      'C++':'cplusplus',
      'C#':'csharp',
      'Jupyter Notebook':'jupyter',
        'HTML': 'html5',
       'CSS': 'css3',
    }
   
    const iconName = languageMap[lang]|| lang.toLowerCase();
    return(
       <div
       className='
       flex
       items-center
       gap-2
       text-gray-200'
        key={lang}>
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`}
        alt={lang}
        width="20px"
        height="20px"
         onError={(e) => e.target.style.display = 'none'}
      />
      <p>{lang}</p>
    
    </div>
      )

})}
<p className="  text-gray-500 mb-2">Recent Works</p>
    <div className='repos
  '>
  {recentWork.map(repo =>(
    <div 
    className="
    flex
    flex-col
    border
    gap-2
    p-[10px]
   "
    key ={repo.id}
    >
    <div className="border
     border-gray-700 
     rounded-lg
      p-3
       mb-2
    flex
    gap-3
    items-center
     text-white">{repo.name}
      <a href ={repo.html_url}
      target="_blank" 
      rel="noreferrer">
        <img src={linkIcon}
        className="
        invert"></img></a></div>
      <p className="text-gray-400">{repo.description}</p>
      <p className="text-cyan-400">⭐ {repo.stargazers_count}</p>
      {repo.homepage && <a href={repo.homepage}
      target="_blank" 
      rel="noreferrer">
        <span className="text-cyan-400 hover:text-cyan-300 
        underline">Live Link</span></a>}
    </div>
      ))}
  
</div>
</div> 
</div>

</div>
)}
</>
)
}
export default App