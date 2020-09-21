let addToy = false;
const baseURL = 'http://localhost:3000/toys'
const toyContainer = document.querySelector("#toy-collection");
const newToyForm = document.querySelector('form')

document.addEventListener("DOMContentLoaded", () => {
  loadToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const newToyForm = document.querySelector('.add-toy-form')
      newToyForm.addEventListener('submit', event => addNewToy(event))
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function loadToys(){
  fetch(baseURL)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
      displayToy(toy)
    })
  })
}

function displayToy(toy){
      const toyCard = document.createElement('div')
      toyCard.classList.add('card')

      const toyName = document.createElement('h2')
      toyName.textContent = toy.name

      const toyPic = document.createElement('img')
      toyPic.src = toy.image
      toyPic.classList.add('toy-avatar')

      const toyLikes = document.createElement('p')
      toyLikes.id = `${toy.id}`
      toyLikes.textContent = `${toy.likes} likes`

      const likeButton = document.createElement('button')
      likeButton.classList.add('like-btn')
      likeButton.textContent = "Like <3"
      likeButton.addEventListener('click', event => addLike(event, toy))

      toyContainer.append(toyCard)
      toyCard.append(toyName, toyPic, toyLikes, likeButton)
    }



function addNewToy(event) {
  event.preventDefault()
  const formData = new FormData(newToyForm)
  const name = formData.get('name')
  const image = formData.get('image')
  let likes = 0
  const newToy = { name, image, likes }
  displayToy(newToy)
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
      body: JSON.stringify({ name, image, likes })
  }).then(response => response.json())
}

function addLike(event, toy){
  const likes = document.getElementById(`${toy.id}`)
  likes.textContent = (toy.likes += 1) + ' likes'
  const jsonLikes = parseInt(likes.innerText)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "likes": jsonLikes
    })
  }).then(response => response.json())

}