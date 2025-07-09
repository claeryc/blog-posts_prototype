let allPosts = [];
let currentIndex = 0;
const postsPerPage = 5;

const postsContainer = document.getElementById("postsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Load JSON and render first 5 posts
fetch("/posts.json")
  .then(res => res.json())
  .then(data => {
    allPosts = data;
    renderPosts();
  });

  function renderPosts() {
    console.log("Rendering posts from index", currentIndex);
    const nextPosts = allPosts.slice(currentIndex, currentIndex + postsPerPage);
    console.log("Next posts to render:", nextPosts);
  
    nextPosts.forEach(post => {
      console.log("Rendering post:", post);
  
      const card = document.createElement("div");
      card.className = "post-card";
  
      try {
        card.innerHTML = `
          <img class="thumbnail" src="${post.thumbnail}" alt="${post.title}" />
          <h2>${post.title}</h2>
          <p>${post.description}</p>
          <small>${new Date(post.date).toLocaleDateString()}</small><br />
          <a href="/posts/${post.slug}.html">Read more</a>
        `;
      } catch (e) {
        console.error("Error building post card:", e, post);
      }
  
      postsContainer.appendChild(card);
    });
  
    currentIndex += postsPerPage;
  
    if (currentIndex >= allPosts.length) {
      loadMoreBtn.style.display = "none";
    }
  }
  
loadMoreBtn.addEventListener("click", renderPosts);