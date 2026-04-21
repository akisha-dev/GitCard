function RecentRepos({recentWork}){
return (
    <>
{recentWork.map((repo)=>{
    return(
      <div key={repo.id}
      className="bg-gray-800 rounded-lg mb-3"
      >
       <div
      className="p-4
      flex
      flex-col
      justify-center
      text-gray-300
      mb-[10px]
      border
      
     "
       > 
       <div className="flex 
       gap-2
       ">{repo.name}
       <a href={repo.html_url}
       target="_blank"
       rel="noreferrer">
        🔗 </a></div>
        {!repo.description?null:<p className="text-gray-400">{repo.description}</p>}
        <div className="text-gray-400"> forks : <span className="text-cyan-400">{repo.forks}</span></div>
        <div>⭐ <span className="text-cyan-400">{repo.stargazers_count}</span></div>
       {repo.homepage && <a href={repo.homepage}
      target="_blank" 
      rel="noreferrer">
        <span className="text-cyan-400 hover:text-cyan-300 
        underline">Live Link</span></a>}
    
      </div>
   
      </div>
)})}
</>
)
}


   
export  default  RecentRepos;