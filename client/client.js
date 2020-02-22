const form = document.querySelector('.form')
const loadingImg = document.querySelector('.loading')
const API_URL = 'http://localhost:5000/mints'

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

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mintMessage)
    }).then(res => res.json()).then(data => console.log(data))

    setTimeout(() => {
        loadingImg.style.display = 'none'
        form.style.display = ''
    }, 1000);
})