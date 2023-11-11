let url
let backdrop = document.querySelector('.backdrop')
let bookmarks = document.querySelector('.bookmarks')
let bookmarkItems = document.querySelectorAll('.bookmarks>li')
let addBookmark = document.querySelector('.add_bookmark')
let urls = JSON.parse(localStorage.getItem('manzillar')) ? JSON.parse(localStorage.getItem('manzillar')) : []

function saveUrl(url) {
  if (url != null && url != '' && !urls.includes(url)) {
    urls.push(url)
    localStorage.setItem('manzillar', JSON.stringify(urls))
  }
}
// remove Item
function removeItem(id) {
  urls.splice(id, 1)
  localStorage.setItem('manzillar', JSON.stringify(urls))
  showUrl()
}
function showUrl() {
  bookmarks.innerHTML = ''
  urls.forEach((url, id) => {
    bookmarks.innerHTML += `<li><a href="https://${url}"><div class="overlay"><i class="fi fi-rr-pen-circle"></i></div> <div class="remove" onclick='event.stopPropagation();removeItem(${id})'><i class="fi fi-rr-cross-small"></i></div><img src="https://www.google.com/s2/favicons?sz=64&domain_url=${url}" alt=""></a></li>`
  });
  bookmarkItems = document.querySelectorAll('.bookmarks>li')
}
addBookmark.addEventListener('click', (e) => {
  url = prompt('Sayt manzilini kiriting');
  saveUrl(url)
  showUrl()
})
showUrl()

bookmarkItems.forEach(item => {
  item.addEventListener('contextmenu', (e) => {
    e.stopPropagation()
    e.preventDefault()
    let target = e.target
    if (target.tagName != 'img') {
      bookmarkItems.forEach(item => {
        item.classList.add('edit')
      })
    }
  })
});

document.body.addEventListener('keydown', (e) => {
  if (e.key == '+') {
    url = prompt('Sayt manzilini kiriting');
    saveUrl(url)
    showUrl()
  }
})
backdrop.addEventListener('click', () => {
  bookmarkItems.forEach(item => {
    item.classList.remove('edit')
  })
})