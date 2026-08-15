async function getusers() {
    const response= await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok){
        throw new Error("failed to fetch users")};
    const users= await response.json();
    return users;
}

async function getposts() {
    const response =await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!response.ok){throw new Error("failed to fetch posts")}
    const posts =await response.json();
    return posts;
}

async function getcomments() {
    const response =await fetch('https://jsonplaceholder.typicode.com/comments')
    if(!response.ok){throw new Error("failed to fetch comments")}
    const comments =await response.json();
    return comments; 
}
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const searchinput= document.getElementById("searchinput");
const sortselect=document.getElementById("sortselect");


async function loadDashboard() {
    try{
        loading.style.display="block";
        error.textContent="";
    const[users, posts, comments]=await Promise.all([getusers(),
        getposts(),
        getcomments(),
    ]);
   
    const userStatistics =users.map(user=>{
        const userposts = posts.filter(post => post.userId===user.id);
    const postIds= userposts.map(post =>post.id);
    const usercomments= comments.filter(comment=> postIds.includes(comment.postId));
    return{
        id: user.id,
        name: user.name,
        email: user.email,
        postsCount: userposts.length,
        commentsCount: usercomments.length,
        phone: user.phone,
        website: user.website,
        company: user.company,

    };
    });

    console.log(userStatistics);

    const userContainer = document.getElementById("usercontainer");
    function renderuser(usersToRender) {
        userContainer.innerHTML = "";
        usersToRender.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <h2>${user.name}</h2>
                <p>posts: ${user.postsCount}</p>
                <p>Comments: ${user.commentsCount}</p>
                <button class="details-btn" data-user-id="${user.id}">Details</button>
            `;
            userContainer.appendChild(card);
        });
    }
    
   searchinput.addEventListener("input",() => {const searchTerm= searchinput.value.toLowerCase();
    const filterdusers= userStatistics.filter(user=> user.name.toLowerCase().includes(searchTerm));
    renderuser(filterdusers);
   });

   sortselect.addEventListener("change",()=>{const sortValue= sortselect.value;
    let sorteduser=[...userStatistics];
    if (sortValue ==="name"){sorteduser.sort((a,b)=> a.name.localeCompare(b.name))}
    if(sortValue ==="posts"){sorteduser.sort((a,b)=> b.postsCount-a.postsCount)}
    if (sortValue ==="comments"){sorteduser.sort((a,b)=> b.commentsCount-a.commentsCount)}
    renderuser(sorteduser);
   });
   userContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("details-btn")) {

        const userId= Number(event.target.dataset.userId)
        console.log(event.target.dataset);
console.log("userId:", userId);
        const foundUser= userStatistics.find(user =>user.id===userId);
        if(!foundUser){console.log("user not found:", userId);
            return;
        }
        
        const details= document.createElement("div");
        details.className= "user-details";
        details.innerHTML=`
        <h2>${foundUser.name}</h2>
        <p><strong>email:${foundUser.email}</p>
        <p><strong>phone:${foundUser.phone}</p>
        <p><strong>website:${foundUser.website}</p>
        <p><strong>company:${foundUser.company.name}</p>
        <p><strong>posts:${foundUser.postsCount}</p>
        <p><strong>comments:${foundUser.commentsCount}</P>`;
        event.target.closest(".user-card").appendChild(details);
    }
   });
     
     loading.style.display="none";   
    } catch(err){
    console.error(err);
    loading.style.display="none"
    if (error) error.textContent = err.message;
}};



 
loadDashboard();
