const myLibrary = [
    new Book('book_0', 'Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 223, true),
    new Book('book_1', 'Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 357, false)
];

function Book(id, title, author, nrOfPages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.nrOfPages = nrOfPages;
    this.isRead = isRead;
    this.changeReadStatus = function () {
      this.isRead = !this.isRead;
    };
    this.info = function () {
        return `${title} by ${author}, ${nrOfPages} pages, ${
            !isRead ? "not" : "already"
        } read ${!isRead ? "yet" : ""}`;
    };
}

function addBookToLibrary() {
    let book = new Book();
    book.id = 'book_' + myLibrary.length;
    book.title = prompt('Title: ');
    book.author = prompt('Author: ');
    book.nrOfPages = prompt('Number of pages: ');
    book.isRead = prompt('Did you red it? (yes, no): ') === 'yes';
    myLibrary.push(book);
}

const render = () => {
    document.querySelector('#app').innerHTML = getHTML();

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((btn) => {
        const selectedBookID = btn.parentNode.id;
        btn.addEventListener('click', () => {
            const bookIdx = myLibrary.findIndex(book => book.id === selectedBookID);
            myLibrary.splice(bookIdx, 1);
            render();
        });
    });

    const readToggles = document.querySelectorAll('.read_toggle_input');
    readToggles.forEach((toggle) => {
        const selectedBookID = toggle.parentNode.parentNode.parentNode.id;
        toggle.addEventListener('click', () => {
            const bookIdx = myLibrary.findIndex(book => book.id === selectedBookID);
            myLibrary[bookIdx].changeReadStatus();
        });
    });

    const addButton = document.querySelector('.add_book');
    addButton.addEventListener('click', () => {
        document.querySelector(".popup_form").style.display = "block";
    });

    const formCloseButton = document.querySelector('.btn_cancel');
    formCloseButton.addEventListener('click', () => {
        document.querySelector(".popup_form").style.display = "none";
    });

    const formAddButton = document.querySelector('.btn_add');
    formAddButton.addEventListener('click', (event) => {
        event.preventDefault()
        addNewBook();
        document.querySelector(".popup_form").style.display = "none";
        render();

    });

}

const addNewBook = () => {
    const form = document.getElementById('add_form');
    const formData = new FormData(form);
    const book = new Book();
    for (const [key, value] of formData.entries()) {
        book[key] = value;
    }
    book.id = 'book_' + myLibrary.length;
    myLibrary.push(book);
}

const header = () => {
    return `<div class="header"><div class="title">My Library</div><button class="add_book">+</button></div>`;
}

const readToogle = (isRead) => {
    return `<div class="read_toggle">Not read<label class="switch">
            <input class = "read_toggle_input" type="checkbox" ${isRead ? 'checked' : ''}>
            <span class="slider round"></span>
        </label>read</div>`;
}

const bookCard = (book) => {
    return `<div class="card" id=${book.id}>
        <div class="card_title">${book.title}</div>
        <div>${book.author}</div>
        <div>${book.nrOfPages} pages</div>
        ${readToogle(book.isRead)}
        <div class="delete"><i class="fa fa-trash-can"></i></div>
    </div>`;
}

const bookCards = () => {
    return myLibrary.map((book, index) => {
        const bookID = `book_${index}`;
        return bookCard(book);
    }).join('');
}

const getHTML = () => {
    return `${header()}
        <div class="card_container">
        ${bookCards()}
        </div>
    `;
}

render();
