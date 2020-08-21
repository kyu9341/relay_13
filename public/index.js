const POSTS_ID = 'posts'
const POSTS_API = 'http://localhost:3000/posts'
// const POSTS_API = 'http://localhost:3000/data.json'

const postsElement = document.getElementById(POSTS_ID)
fetch(POSTS_API)
  .then(response => response.json())
  .then(posts => {
    postsElement.innerHTML = `${
      posts
        .map(post => `
          <li id="${post.postId}" class="post">
            <div id="${post.postId}-0" class="post-head">
              제목:
              <strong class="title">
                <span class="${post.sentiment}">${post.title}</span>
              </strong>
            </div>
            <div class="post-body">
              <div class="post-body-title">내용:</div>
              <span id="${post.postId}" class="${post.sentiment || 'neutral'}">
              ${post.contents}</span>
              </div>
            </div>
          </li>
          `:''  
          }
        `)
                .join('')
        }`
    })
