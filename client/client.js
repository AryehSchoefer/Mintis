const form = document.querySelector('.form')
const loadingImg = document.querySelector('.loading')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    form.style.display = 'none'
    loadingImg.style.display = 'block'

    const formData = new FormData(form)

    const username = formData.get('username')
    const message = formData.get('message')

    // You can think of a mint as a tweet, so mintMessage can be interpreted as tweetMessage
    const mintMessage = {
        username,
        message
    }

    console.log(mintMessage)
    setTimeout(() => {
        loadingImg.style.display = 'none'
        form.style.display = ''
    }, 1000);
})