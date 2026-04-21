import bgImage from "../assets/github.svg"
import xIcon from "../assets/twitter-x.svg";
import mail from "../assets/envelope.svg";
import map from "../assets/map.svg";
import RecentRepos from "./RecentRepos";

const LanguageMap = {
  'C++': 'cplusplus',
  'Jupyter Notebook': 'jupyter',
  'HTML': 'html5',
  'CSS': 'css3',
}

function Profile({userInfo, language, recentWork, cardRef}){
    return(
        <>
        {userInfo &&
  <div
  ref={cardRef} className="container-card
  max-w-2xl
   mx-auto
   mt-8
  rounded-xl
  overflow-hidden
  border
  border-gray-700
  ">

  <div className='grid1 
  grid
  grid-cols-2
  '>
    <div className="sub1
    border-r border-gray-700 
    
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
    <a href={userInfo.html_url}
    target="_blank"
       rel="noreferrer">
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
     🔗 
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
    text-gray-300
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
   gap-2
   text-gray-400">
   Repos :<span className="text-cyan-400"> {userInfo.public_repos}
   </span> <a href={`https://github.com/${userInfo.login}?tab=repositories`}

    target="_blank"
    rel="noreferrer">
     🔗 
    </a>
  </div>
}
  
 <div
 className=""><p className="mb-4 text-gray-400">Languages used:</p>
  {Object.keys(language).slice(0,3).map((lang)=>{
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
bg-gray-900 p-6 border-t border-gray-700

 bg-gray-900
 p-6">
  <p className="text-gray-400
  
  mb-[10px]">Recent works:</p>
  <RecentRepos recentWork={recentWork} />
    


  
 
 
  
  

</div>
  </div>
  }
        </>
    )

}


export default Profile