import bgImage from "./assets/github.svg";
import {useState} from 'react';
import xIcon from "./assets/twitter-x.svg"
import linkIcon from "./assets/link.svg";

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
  grid
  grid-cols-2
  gap-4
  m-[30px]
  pl-[15px]
  pr-[10px]
  pb-[15px]
  pt-[15px]
  bg-white
  border-[2px]
  border-black'>
  <div className='grid1
  mt-8
  flex
  align-center
  justify-center 
  text-md
  border-1
  p-8
'>
  <div className='bio'>
  <img 
  className='h-[250px]
  w-[240px]
  mb-[8px]
  rounded-[120px]
  ' 
  src ={userInfo.avatar_url} />
  <p
  className="
  text-center
  text-xl">{userInfo.name}</p>
  {!userInfo.bio?null:<p>{userInfo.bio}</p>}
   {!userInfo.email?null:<p>{userInfo.email}</p>}
 
  
  <div className='social'>
  {!userInfo.blog?null:<p>blog:{userInfo.blog}</p>}
  {!userInfo.twitter_username?null:
   <div className="flex items-center gap-2">
  <img
  className="
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
  border-1
  p-8
  '>


  <div className='github-info'>
 {!userInfo.location?null:<p>{userInfo.location}</p>}

  {!userInfo.company?null:<p>{userInfo.company}</p>}

  {!userInfo.public_repos?null:
  <div className="repos
  flex 
  items-center
  gap-2">
   Public Repos : {userInfo.public_repos} 
  <a href={`https://github.com/${userInfo.login}?tab=repositories`}>
   <img 
  className="
  h-[20px]
  w-[20px]" 
  src={linkIcon}></img>
  </a></div>}
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
    <div className='repos'>
  {recentWork.map(repo =>(
    <div key ={repo.id}
    >
      <a href ={repo.html_url}>{repo.name}</a>
      <p>{repo.description}</p>
      <p>⭐ {repo.stargazers_count}</p>
      {repo.homepage && <a href={repo.homepage}
      target="_blank" 
      rel="noreferrer">
        Live</a>}
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