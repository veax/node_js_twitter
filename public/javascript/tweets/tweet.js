window.addEventListener('DOMContentLoaded', () => {
  bindTweets()
})

// using axios to delete tweets
function bindTweets() {
  const elements = document.querySelectorAll('.fa-minus-circle');
  const tweetContainer = document.querySelector('#tweet-list-container')
  elements.forEach( elem => {
    elem.addEventListener('click', (e) => {
      const tweetId= e.target.getAttribute('tweetId');
      axios.delete('/tweets/' + tweetId)
        .then(res => {
          tweetContainer.innerHTML = res.data
          bindTweets()
        })
        .catch(err => {
          console.log(err)
        }) 
    }) 
  })
}