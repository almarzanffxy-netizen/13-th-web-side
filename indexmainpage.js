let allItems = []; // Global storage

// 🔥 Fetch data (but DO NOT display)
const AllCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then((data) => {
      allItems = data.data;

      // Show empty state on load
      const container = document.getElementById("AllwordsShwo");
      container.innerHTML = `
        <p class="text-center col-span-4 text-xl text-gray-400">
          Click "All" to load issues
        </p>
      `;

      // Set count = 0
      updateIssueCount([]);
    });
};

// 🔢 Update Issue Count
const updateIssueCount = (items) => {
  document.getElementById("issueCount").innerText = `${items.length} Issues`;
};

// 🔍 Search cards
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

// 🔥 Display cards
const displayCards = (items) => {
  const container = document.getElementById("AllwordsShwo");
  container.innerHTML = "";

  updateIssueCount(items);

  // 🔥 If no items
  if (items.length === 0) {
    container.innerHTML = `
      <p class="text-center col-span-4 text-xl text-gray-400">
        No issues found
      </p>
    `;
    return;
  }

  items.forEach(item => {

    const priority    = item.priority ?? "No priority";
    const title       = item.title ?? "No title";
    const description = item.description ?? "No description";
    const labels      = item.labels ?? [];
    const assignee    = item.assignee ?? "No assignee";
    const createdAt   = item.createdAt ?? "No date";
    const status      = item.status ?? "unknown";

    // 🔥 Status image
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

    // 🔥 Priority color
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

    // 🔥 Border color
    let bordertop =
      status.toLowerCase() === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-[#A855f7]";

    // 🔥 Create card
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card w-[300px] h-[350px] shadow-sm rounded-md ${bordertop} p-3">

        <div class="flex justify-between items-center">
          <img src="${statusImg}" class="w-8 h-8">
          <button class="btn ${textColor} ${bgColor} rounded-full border px-3 py-1">
            ${priority}
          </button>
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

              return `
                <button class="btn ${btnfixit} rounded-full border px-3 py-1 text-sm">
                  ${label}
                </button>
              `;
            }).join("")
          }
        </div>

        <hr class="my-2 border-gray-600">

        <div class="text-sm">
          <p class="p-1">${assignee}</p>
          <p>${createdAt}</p>
        </div>

      </div>
    `;

    container.appendChild(div);
  });
};

// 🔘 Filter buttons
const filterCards = (status) => {
  if (status.toLowerCase() === "all") {
    displayCards(allItems);
  } else {
    const filtered = allItems.filter(
      item => item.status.toLowerCase() === status.toLowerCase()
    );
    displayCards(filtered);
  }
};

// 🚀 Run
AllCards();