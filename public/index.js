const POSTS_ID = 'posts'
const POSTS_API = 'http://localhost:3000/posts'
// const POSTS_API = 'http://localhost:3000/data.json'

const postsElement = document.getElementById(POSTS_ID)

fetch(POSTS_API)
  .then(response => response.json())
  .then(posts => {
    console.log(posts)
    postsElement.innerHTML = `${
      posts
        .map(post => `
          <li id="${post.postId}" class="post">
            <div id="${post.postId}-0" class="post-head">
              제목:
              <strong class="title">${
                post.contents.some(content => content.contentId === '0') ?
                  `<span class="${post.contents[0].sentiment}">${post.contents[0].text}</span>`
                  : '<span class="neutral">(무제)</span>'
              }</strong>
            </div>
            <div class="post-body">
              <div class="post-body-title">내용:</div>${
                post.contents
                  .slice(1)
                  .map(content => `
                    <span id="${post.postId}-${content.contentId}" class="${content.sentiment || 'neutral'}">
                      ${content.text}
                    </span>
                  `).join('')
              }</div>
            </div>
          </li>
        `)
        .join('')
    }`
  })
