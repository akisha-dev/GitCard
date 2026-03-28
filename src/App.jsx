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
  <div className="max-w-2xl
   mx-auto
   mt-8
  rounded-xl
  overflow-hidden
  border
  border-gray-700">

  <div className='grid1 
  grid
  grid-cols-2
  '>
    <div className="sub1
    
  bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] 
flex 
flex-col
 items-center
  p-6
  space-y-2">
  {!userInfo.avatar_url? null :
  <img 
   className=' h-[180px] 
   mb-8
  w-[180px] 
  rounded-full
  shadow-[0_0_20px_rgba(0,200,255,0.3)]
  ' src={userInfo.avatar_url}></img>}
  {
    !userInfo.name?null:<p 
    className="text-white">{userInfo.name}</p>
  }
  {
    !userInfo.bio?null:<p className="text-gray-300
    text-center">{userInfo.bio}</p>
  }
  <div
   className="
   flex
   gap-2
   text-gray-300
   ">
    github link :
    <a href={userInfo.html_url}>
    <img
    src={bgImage}
    width='20px'
    height='20px'
    className="invert
    "></img>
    </a>
  </div>
 
 {!userInfo.twitter_username?null: 
<div
className="
   flex
   gap-2
   text-gray-300">
  <img src={xIcon}
  width=' 15px'
  height='20px'
  className="invert
    "
  ></img>: {userInfo.twitter_username} 
</div>}
 
 {!userInfo.blog?null: 
 <div
   className="
   flex
   gap-2
   text-gray-300">
    blogs :
    <a href={userInfo.blog}
    target="_blank"
    rel="noreferrer">
    <img
    src={linkIcon}
    width='20px'
    height='20px'
    className="
    invert"></img>
    </a>
  </div>
}

  </div>
  <div className="sub2
  text-gray-300
  bg-gray-900
   p-6 
   space-y-3">
   
 {
    !userInfo.email?null:
    <div
    className="flex gap-2
    text-gray-300">
      <img src={mail}
      width="20px"
      height="20px"
      className="invert"></img>
      {userInfo.email}
      </div>
  }

  {
    !userInfo.location?null:
    <div
    className="
    flex
    gap-2">
      <img src={map}
      className="
      w-[20px]
      h-[20px]
      invert
      "></img>
      <div>{userInfo.location}</div>
      </div>
  }
    {
    !userInfo.company?null:<p>Company : {userInfo.company}</p>
  }
 {!userInfo.public_repos? null:
<div
   className="
   flex
   gap-2">
   Repos :<span className="text-cyan-400"> {userInfo.public_repos}
   </span> <a href={userInfo.repos_url}
    target="_blank"
    rel="noreferrer">
    <img
    src={linkIcon}
    width='20px'
    height='20px'
    className="
    invert"></img>
    </a>
  </div>
}
  
 <div
 className=""><p className="mb-4">Languages used:</p>{
  Object.keys(language).slice(0,3).map((lang)=>{
  const LanguageMap ={
    'C++':'cplusplus',
    'Jupyter Notebook':'jupyter',
     'HTML':'html5',
     'CSS':'css3',
  }
  const IconName = LanguageMap[lang] ||lang.toLowerCase();
 return(
 <div
  key={lang}
  className="
  flex
  flex-row
  gap-2
  space-y-4
  
  ">
    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${IconName}/${IconName}-original.svg`
    }width="20px"
     height="20px"
     onError={(e) => e.target.style.display='none'}></img>
     <div className="flex
     flex-row
     w-[170px]
     max-w-[200px]
    
     mb-[10px]
     border
     justify-center
     items-center
     text-white
     rounded-xl
     bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50]
      ">{lang}</div>
  </div>

  )
  


})


 }
 </div>
 </div>
 </div>
 <div className="
  
 bg-gray-900 
 p-6">
  <p>Recent works:</p>
   {recentWork.map((repo)=>{
    return(
      <div key={repo.id}>
       <div
      className="
      flex
      gap-3
      space-y-3"
       > <p>{repo.name}</p>
       <a href={repo.html_url}
       target="_blank"
       rel="noreferrer">
        <img src ={linkIcon}
        height="20px"
        width="20px"
        className="invert">
        </img></a></div>
        <p>{repo.description}</p>
        <p>forks:{repo.forks}</p>
        <p>⭐{repo.stargazers_count}</p>
        <a href={repo.homepage}><span
        className="text-cyan-400 hover:text-cyan-300 
        underline">
          Live link</span></a>
      
      </div>
    )
   })

   }
   </div>


  
 
 
  </div>
}
 
  </>
  )}
  export default App
