const form = document.querySelector('.form')
const loadingImg = document.querySelector('.loading')
const messagesSection = document.querySelector('.messages')
const BASE = 'http://localhost:'
const PORT = 3000
const API_URL = `${BASE}${PORT}`

loadMintis()

form.addEventListener('submit', async (event) => {
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

    const response = await fetch(`${API_URL}/insertMint`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(mintMessage)
    })
    const data = await response.json()
    console.log(data)

    setTimeout(() => {
        loadingImg.style.display = 'none'
        form.style.display = ''
        loadMintis()
    }, 1000);
})

async function loadMintis() {
    const request = await fetch(`${API_URL}/getMintis`)
    const messages = await request.json()
    console.log(messages)

    while (messagesSection.firstChild) {
        messagesSection.removeChild(messagesSection.firstChild)
    }

    messages.reverse()
    messages.forEach(message => {
        const messageContainer = document.createElement('div')
        messageContainer.setAttribute('class', 'message')

        const username = document.createElement('h3')
        username.setAttribute('class', 'username')
        username.textContent = message.username

        const messageText = document.createElement('p')
        messageText.setAttribute('class', 'message-text')
        messageText.textContent = message.message

        const date = document.createElement('small')
        date.setAttribute('class', 'date')
        const date2 = new Date(message.date)
        date.textContent = date2.toUTCString()

        messageContainer.appendChild(username)
        messageContainer.appendChild(messageText)
        messageContainer.appendChild(date)

        messagesSection.appendChild(messageContainer)
    })
}