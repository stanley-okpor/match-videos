
    /* the actual API endpoint */
const API_URL = "https://www.scorebat.com/video-api/v3/feed/?token=MTkyNjE5XzE3MzU3NzY5OTZfNTU3YmVjNmZjNDkwYTk5Y2QzNGY0ZDVkNDU3Zjk2ODMyZDQ5YjUzOQ====";

/* Pagination variables */
let currentPage = 1;
const itemsPerPage = 50;

// Fetch data from the API
async function fetchMatchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Display matches for the current page
function displayMatches(data) {
  if (!data || !data.response) {
    console.log("No data found!");
    return;
  }

  const container = document.getElementById("matches-container");
  container.innerHTML = ""; // Clear existing content

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.response.slice(startIndex, endIndex);

  currentItems.forEach(match => {
    const matchDiv = document.createElement("div");
    matchDiv.className = "match";

    const title = document.createElement("h3");
    title.textContent = `Title: ${match.title}`;
    matchDiv.appendChild(title);

    const competition = document.createElement("p");
    competition.textContent = `Competition: ${match.competition}`;
    matchDiv.appendChild(competition);

    const date = document.createElement("p");
    date.textContent = `Date: ${new Date(match.date).toLocaleString()}`;
    matchDiv.appendChild(date);

    const thumbnail = document.createElement("img");
    thumbnail.src = match.thumbnail;
    thumbnail.alt = `${match.title} thumbnail`;
    matchDiv.appendChild(thumbnail);

  

    const videosHeader = document.createElement("h4");
    videosHeader.textContent = "Videos:";
    matchDiv.appendChild(videosHeader);

    match.videos.forEach(video => {
      const videoDiv = document.createElement("div");
      videoDiv.innerHTML = video.embed;
      matchDiv.appendChild(videoDiv);
    });

    container.appendChild(matchDiv);
  });

  renderPagination(data.response.length);
}

// Render pagination controls
function renderPagination(totalItems) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = ""; // Clear existing pagination

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      fetchAndDisplayMatches();
    });
    paginationContainer.appendChild(pageButton);
  }
}

// Fetch and display matches with pagination
async function fetchAndDisplayMatches() {
  const matchData = await fetchMatchData(API_URL);
  displayMatches(matchData);
}

// Initial call
fetchAndDisplayMatches();


//old
// Main execution
(async function () {
  const matchData = await fetchMatchData(API_URL);
  displayMatches(matchData);
})();

  

  

