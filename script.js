const openBtn = document.querySelector('#openModalBtn');
const closeBtn = document.querySelector('#closeModalBtn');
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#modalOverlay');
const addBookBtn = document.querySelector('#addBookBtn');
const form = document.querySelector('form');
const booksContainer = document.querySelector('#booksContainer');

let books = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function openModal() {
    document.body.classList.add('modal-open');
    modal.classList.add('visible');
    overlay.classList.add('visible');
}

function closeModal() {
    document.body.classList.remove('modal-open');
    modal.classList.remove('visible');
    overlay.classList.remove('visible');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (addBookToLibrary()) {
        closeModal();
        form.reset();
    }
});


function addBookToLibrary() {
    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const pages = document.querySelector('#pages').value.trim();
    const read = document.querySelector('#read').checked;

    if (!title || !author || !pages) {
        alert('Please fill in all fields.');
        return;
    }

    const book = new Book(title, author, pages, read);
    books.push(book);
    displayBook(book);
    return true;
}

function displayBook(book) {
    const booksContainer = document.querySelector('#booksContainer');

    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.setAttribute('data-id', book.id);

    bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <p class="pages"><span class="number">${book.pages}</span> pages</p>
        <p class="status">${book.read ? 'read' : 'not read'}</p>
        <button class="btn btn-outline">${book.read ? 'Mark as unread' : 'Mark as read'}</button>
    `;

    booksContainer.appendChild(bookItem);

    const markBtn = bookItem.querySelector('button');
    const statusText = bookItem.querySelector('.status');

    if (book.read) {
        bookItem.classList.add('read');
    }

    markBtn.addEventListener('click', () => {
        const bookId = bookItem.getAttribute('data-id');
        const bookToUpdate = books.find(b => b.id === bookId);

        if (bookToUpdate) {
            bookToUpdate.read = !bookToUpdate.read;
            statusText.textContent = bookToUpdate.read ? 'read' : 'not read';
            markBtn.textContent = bookToUpdate.read ? 'Mark as unread' : 'Mark as read';
            bookItem.classList.toggle('read', bookToUpdate.read);
        }
    });
}

