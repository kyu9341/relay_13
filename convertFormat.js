function convertFormatForAnalisys(posts) {
  return posts
    .map(post => post.contents
      .map(content => ({
        postId: post.postId,
        ...content
      }))
    )
    .reduce((acc, cur) => [...acc, ...cur], [])
}

function convertFormatForUI(data) {
  return data
    .sort((a, b) => +a.postId - +b.postId || +a.contentId - +b.contentId)
    .reduce((acc, cur) => {
      const post = acc.find(post => post.postId === cur.postId)
      if (!post) {
        return [...acc, {
          postId: cur.postId,
          contents: [cur]
        }]
      }
      post.contents.push(cur)
      return acc
    }, [])
}

module.exports = {
  convertFormatForAnalisys,
  convertFormatForUI
}
