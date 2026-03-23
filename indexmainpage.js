let allItems = []; 

const AllCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then((data) => {
      allItems = data.data;
      const container = document.getElementById("AllwordsShwo");
      container.innerHTML = `
        <p class="text-center col-span-4 text-xl text-gray-400">
          Click "All" to load issues
        </p>
      `;
      updateIssueCount([]);
    });
};


const updateIssueCount = (items) => {
  const issueCount = document.getElementById("issueCount");
  if (issueCount) issueCount.innerText = `${items.length} Issues`;
};


const searchCards = () => {
  const input = document.getElementById("inputForsearch").value.toLowerCase();

  if (input === "") {
    displayCards(allItems);
    return;
  }

  const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(input) ||
    item.description.toLowerCase().includes(input)
  );

  displayCards(filtered);
};


const displayCards = (items) => {
  const container = document.getElementById("AllwordsShwo");
  container.innerHTML = "";

  updateIssueCount(items);

  if (items.length === 0) {
    container.innerHTML = `
      <p class="text-center col-span-4 text-xl text-gray-400">
        No issues found
      </p>
    `;
    return;
  }

  items.forEach((item, index) => {
    const priority    = item.priority ?? "No priority";
    const title       = item.title ?? "No title";
     const description = item.description ?? "No description";
    const labels      = item.labels ?? [];
    const assignee    = item.assignee || "No assignee";
    const createdAt   = item.createdAt ?? "No date";
      const status      = item.status ?? "unknown";

    
    let statusImg = "";
    switch(status.toLowerCase()) {
      case "open":
        statusImg = "B13-A5-Github-Issue-Tracker/assets/Open-Status.png";
        break;
      case "closed":
        statusImg = "B13-A5-Github-Issue-Tracker/assets/Closed- Status .png";
          break;
        default:
        statusImg = "B13-A5-Github-Issue-Tracker/assets/Closed- Status .png";
    }

    
    let bgColor = "";
      let textColor = "";
    const p = priority.toLowerCase();
    if (p.includes("high")) {
      bgColor = "bg-red-100";
      textColor = "text-red-500";
    } else if (p.includes("medium")) {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-500";
    } else {
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
    }

    
    let bordertop = status.toLowerCase() === "open" 
         ? "border-t-4 border-green-500" 
        : "border-t-4 border-red-500";

  
    const modalId = `modal-${index}`;

    const div = document.createElement("div");
    div.innerHTML = `
      <!-- Card -->
      <div class="card w-[300px] h-[350px] shadow-sm rounded-md ${bordertop} p-3 cursor-pointer">
        <div class="flex justify-between items-center">
          <img src="${statusImg}" class="w-8 h-8">
          <button class="btn ${textColor} ${bgColor} rounded-full border px-3 py-1">${priority}</button>
        </div>
        <div class="mt-2">
          <h1 class="text-2xl font-bold">${title}</h1>
          <p class="text-gray-300 text-xl">${description}</p>
        </div>
        <div class="flex gap-2 flex-wrap mt-2">
          ${
            labels.map(label => {
              let btnfixit = label.toLowerCase().includes("bug")
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-500";
              return `<button class="btn ${btnfixit} rounded-full border px-3 py-1 text-sm">${label}</button>`;
            }).join("")
          }
        </div>

        <hr class="my-2 border-gray-600">

        <!-- TWO LINE INFO -->
        <div class="mt-2 text-sm text-gray-400">
          <p>#${index + 1} by ${assignee}</p>
          <p>${createdAt}</p>
        </div>
      </div>

      <!-- Modal -->
      <input type="checkbox" id="${modalId}" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box space-y-3">
          <h3 class="font-bold text-lg">${title}</h3>
          <p class="py-4">
            <span class="py-1 px-2 text-white ${status.toLowerCase() === 'open' ? 'bg-[#00A96E]' : 'bg-red-500'} rounded-full">${status}</span>
            <span>.Opened by ${assignee}</span>
            <span>${createdAt}</span>
          </p>

          <div class="flex gap-2 flex-wrap mt-2">
            ${
              labels.map(label => {
                let btnfixit = label.toLowerCase().includes("bug")
                  ? "bg-red-100 text-red-500"
                  : "bg-green-100 text-green-500";
                return `<button class="btn ${btnfixit} rounded-full border px-3 py-1 text-sm">${label}</button>`;
              }).join("")
            }
          </div>

          <p class="text-gray-300">${description}</p>

          <div class="space-y-3 shadow-sm">
            <div class="flex justify-around items-center">
              <span>Assignee:</span>
              <span>Priority:</span>
            </div>
            <div class="flex justify-around items-center">
              <h2 class="text-xl font-bold">${assignee}</h2>
              <button class="btn ${textColor} ${bgColor} rounded-full border px-3 py-1">${priority}</button>
            </div>
          </div>
          <div class="modal-action">
            <label for="${modalId}" class="btn">Close</label>
          </div>
        </div>
      </div>
    `;

    container.appendChild(div);

    const card = div.querySelector(".card");
    card.addEventListener("click", () => {
      document.getElementById(modalId).checked = true;
    });
  });
};


const filterCards = (status) => {
  if (status.toLowerCase() === "all") {
    displayCards(allItems);
  } else {
    const filtered = allItems.filter(item => item.status.toLowerCase() === status.toLowerCase());
    displayCards(filtered);
  }
};


AllCards();