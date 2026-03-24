console.log("hello");

const contentsDiv = document.getElementById("contents-div");

const contentCards = document.getElementById("contentCards");

const loading = document.getElementById("loading");

const issueDetailsModal = document.getElementById("issue-details-modal");

const issueTitle = document.getElementById("issueTitle");

const issueDescription = document.getElementById("issueDescription");

const issueAssignee = document.getElementById("issueAssignee");

const issuePriority = document.getElementById("issuePriority");

const name = document.getElementById("name");

const issueCount = document.getElementById("issueCount");

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
    // displayIssues(info.data);

    allIssues = info.data;
    displayIssues(allIssues);
    
}

function displayIssues(issues){

    // ...............
    contentCards.innerHTML = "";
    // ...........................
    console.log(issues);
    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement("div");
        card.className = `card bg-white p-4 rounded-md shadow-md border-t-4 ${
    String(issue.status).toLowerCase().trim() === "open"
    ? "border-green-700"
    : "border-purple-700"
}

`;
    
        card.innerHTML = ` 
         <div id="" class="flex justify-between items-center">
                        <img src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
                        <p class="text-red-400 bg-red-200 rounded-full py-1 px-5">${issue.priority}</p>

                    </div>
                    <h3 class="font-bold text-xl cursor-pointer hover:text-primary" onclick= "openIssueModal(${issue.id})" >${issue.title}</h3>
                    <p class="line-clamp-2">${issue.description}</p> 
                    <div class="flex justify-between items-center mb-3">
                        
                           ${issue.labels.map(label => labelBadge(label)).join("")}
                        
                    </div>
                    <hr class="space-y-3 opacity-40">
                    <p class="mt-3">#1 by john_doe</p>
                    <p>1/15/2024</p>

                </div>
        `;

        contentCards.appendChild(card);
        
    });
    
}

// labels function


function labelBadge(label) {
    const text = String(label).toLowerCase().trim();

    if (text.includes("bug")) {
        return ` <button class="text-red-400 bg-red-100 border-2 border-red-300  flex items-center gap-1 p-2 rounded-full"> <img src="./B13-A5-Github-Issue-Tracker/assets/Vector.png" alt="" class="h-3 w-3">   BUG</button>
        `;
    }

    if (text.includes("help wanted")) {
        return ` <button class="text-yellow-600 bg-yellow-100 border-2 border-yellow-300  flex items-center gap-1 p-2 rounded-full"><span><img src="./B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="" class="h-4 w-4"></span> HELP WANTED</button>

        `;
    }

    return `<button class="text-green-600 bg-green-100 border-2 border-green-300  flex items-center gap-1 p-2 rounded-full">${label}</button>
`;


}








async function openIssueModal(issueId) {

    console.log(issueId, "IssueId");

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)

    const info = await res.json();

    const issueDetails = info.data;

    console.log(issueDetails, "info");

    issueDetailsModal.showModal();

    issueTitle.textContent = issueDetails.title;

    issueDescription.textContent = issueDetails.description;

    issueAssignee.textContent = issueDetails.assignee;

    issuePriority.textContent = issueDetails.priority;

    name.textContent = issueDetails.assignee;




}


// active button style function

function activeButton(activeBtn) {
    const buttons = document.querySelectorAll(".all-btn, .open-btn, .closed-btn");

    buttons.forEach(btn => {
        btn.classList.remove("bg-blue-500", "text-white");
        btn.classList.add("border", "border-gray-400");
    });

    activeBtn.classList.add("bg-blue-500", "text-white");
}

// issue counts


function updateIssueCount(count) {
    issueCount.textContent = `${count} Issues`;
}





// button functionalities

document.querySelector(".all-btn").addEventListener("click", (e) => {
    activeButton(e.target);
    displayIssues(allIssues);
    updateIssueCount(allIssues.length);
});

document.querySelector(".open-btn").addEventListener("click", (e) => {
    activeButton(e.target);
    const openIssues = allIssues.filter(issue => 
        issue.status.toLowerCase().trim() === "open");
    displayIssues(openIssues);
    updateIssueCount(openIssues.length);
});

document.querySelector(".closed-btn").addEventListener("click", (e) => {
    activeButton(e.target);
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayIssues(closedIssues);
    updateIssueCount(closedIssues.length);
});


// card.className = "card bg-white p-4 rounded-md shadow-md border-t-4 border-green-700"

// card.className = `card bg-white p-4 rounded-md shadow-md border-t-4 ${
//     String(issue.status).toLowerCase().trim() === "open"
//     ? "border-green-700"
//     : "border-red-700"
// }

// `;









loadIssues();