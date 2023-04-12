const searchContainer = document.querySelector(".search-container");
const profileContainer = document.querySelector(".profile-container");
const url = "https://api.github.com/users/";



const noResultText = document.querySelector(".no-search-result");
const darkLightModebtn = document.querySelector(".dark-mode-btn");
const modeText = document.querySelector(".mode-text");
const modeIcon = document.querySelector (".mode-icon");
const searchButton = document.querySelector(".search-btn");
const inputSearch = document.querySelector(".profile-search-input"); 
const profilePicture = document.querySelector(".profile-picture");
const userName = document.querySelector(".name"); 
const usersUsername = document.querySelector(".users-username");

const joinedDate = document.querySelector(".joined-date");
const months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"];

const bio = document.querySelector(".bio"); 
const reposeNum = document.querySelector(".repos-num"); 
const followersNum = document.querySelector(".followers-num"); 
const followingNum =document.querySelector(".following-num"); 
const userLocation = document.querySelector(".location-name"); 
const websiteLink = document.querySelector(".website-link"); 
const twitterLink = document.querySelector(".twitter-username"); 
const companyName = document.querySelector(".companyname"); 

searchButton.addEventListener("click", function(){
    if(inputSearch.value !== ""){
        getUserData(url+inputSearch.value);
    }
        profileContainer.classList.add("active");
});


inputSearch.addEventListener("keydown", function(pressed){
    if(pressed.key =="Enter"){
        if(inputSearch.value !== ""){
            getUserData(url + inputSearch.value);
        }
    }
},false
);

inputSearch.addEventListener("input", function(){
    noResultText.style.display = "none";
}); 




// api call
async function getUserData(gitUrl){
    let apiCall = await fetch(gitUrl); 
    let response = await apiCall.json(); 
    let dataApi = response;
    renderProfile(dataApi);
  }


function renderProfile(data){
    if (data.message !=="Not found" ){
        noResultText.style.display = "none";
        profileContainer.classList.add("active");

            function checkNull (para1, para2 ){
                if(para1 === "" || para1  === null){
                    return false; 
                }else{
                    return true; 
                }
            }

            profilePicture.src = `${data.avatar_url}`; 
            userName.innerText = data.name === null ? data.login : data.name; 
            usersUsername.href = `${data.html_url}`; 
            usersUsername.innerText = `${data.login}`; 
            datesegments = data.created_at.split("T").shift().split("-");;
            joinedDate.innerText = `Joined: ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
            bio.innerText = data.bio == null ? "User have no bio" : `${data.bio}`;
            reposeNum.innerText = `${data.public_repos}`; 
            followersNum.innerText = `${data.followers}`;
            followingNum.innerText = `${data.following}`
            userLocation.innerText = checkNull(data.location, userLocation) ? data.location : "location not available"; 
            websiteLink.innerText = checkNull(data.blog, websiteLink) ? data.blog : "No Page Available"
            websiteLink.href = checkNull(data.blog, websiteLink) ? data.blog : "#";
            twitterLink.innerText = checkNull(data.twitter_username, twitterLink) ? data.twitter_username : "no username found"; 
            twitterLink.href = checkNull(data.twitter_username, twitterLink) ? `https://twitter.com/${data.twitter_username}` : "#" ; 
            companyName.innerText = checkNull(data.company, companyName) ? data.company : "not available"; 
        }else{
            noResultText.style.display = "block";
        }
}









