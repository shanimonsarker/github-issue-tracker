console.log("hello");

const contentsDiv = document.getElementById("contents-div");

const contentCards = document.getElementById("contentCards");

const loading = document.getElementById("loading");

const issueDetailsModal = document.getElementById("issue-details-modal");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res=> res.json())
.then(info=> {
    // console.log(info);
})


function showLoading() {
    loading.classList.remove("hidden");
    contentCards.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}



async function loadIssues() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    hideLoading();
    displayIssues(info.data);
    
}

function displayIssues(issues){
    console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement("div");
        card.className = " card bg-white p-4 rounded-md shadow-md border-t-4 border-green-700"
        card.innerHTML = ` 
         <div id="" class="flex justify-between items-center">
                        <img src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
                        <p class="text-red-400 bg-red-200 rounded-full py-1 px-5">High</p>

                    </div>
                    <h3 class="font-bold text-xl" onclick= "openIssueModal(${issue.id})" >${issue.title}</h3>
                    <p class="line-clamp-2">${issue.description}</p> 
                    <div class="flex justify-between items-center mb-3">
                        
                            <button class="text-red-400 bg-red-100 border-2 border-red-300 font-bold flex items-center gap-1 p-2 rounded-full"> <img src="./B13-A5-Github-Issue-Tracker/assets/Vector.png" alt="" class="h-3 w-3">   BUG</button>
                        
                            <button class="text-yellow-600 bg-yellow-100 border-2 border-yellow-300 font-bold flex items-center gap-1 p-2 rounded-full"><span><img src="./B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="" class="h-4 w-4"></span> HELP WANTED</button>
                        
                    </div>
                    <hr class="space-y-3 opacity-40">
                    <p class="mt-3">#1 by john_doe</p>
                    <p>1/15/2024</p>

                </div>
        `;

        contentCards.appendChild(card);
        
    });
    
}

async function openIssueModal(issueId) {

    console.log(issueId, "IssueId");

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)

    const info = await res.json();

    const issueDetails = info.issue;

    console.log(issueDetails, "info");

    issueDetailsModal.showModal();
}







loadIssues();