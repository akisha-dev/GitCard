
import {useRef,useState} from 'react';
import bgImage from "./assets/github.svg";
import html2canvas from "html2canvas-pro";
import download from "./assets/download.svg";
import Profile from './components/Profile';




  
  
function App(){
  
  let[username,setUsername]=useState('');
  let[language,setLanguage] = useState({});
  let[recentWork,setRecentWork]=useState([]);
  let [userInfo,setUserInfo]=useState(null);
  const cardRef = useRef(null);
async function getInfo() {
  if (!username) {
    alert('please enter a username!')
    return;
  }
  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  if (!userResponse.ok) {
    alert('User not found!');
    return;
  }
  const userInfo = await userResponse.json();
  setUserInfo( userInfo);
  const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await repoResponse.json();
  let counts = {};
  repos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });
  setLanguage(counts);
  const recentWork = repos
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 3);
  setRecentWork(recentWork);
}

  


async function DownloadCard() {
  if(!cardRef.current) return;
  const canvas = await html2canvas(cardRef.current, {
    useCORS: true,
    allowTaint: false, 
    backgroundColor: '#111827',
    scale: 2,
    logging: false,
    width: cardRef.current.offsetWidth,
    height: cardRef.current.offsetHeight,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight
  });

  const link = document.createElement('a');
  link.download = `${userInfo.login}-gitcard.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  }
  
  return(
  <div className="min-h-screen pb-16">
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
 
}}>Search</button>
</div>

<Profile  userInfo={userInfo}
language={language}
recentWork={recentWork}
cardRef={cardRef}
/>

 {userInfo &&<div className="flex justify-center mt-4">
        <button onClick={DownloadCard}>
          <img src={download} className="w-[20px] h-[20px] invert" />
        </button>
      </div>
}
</div>
  )
}

export default App

