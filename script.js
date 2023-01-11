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
}

const getBookIndexById = (idx) => myLibrary.findIndex(book => book.id === idx);

const render = () => {
    document.querySelector('#app').innerHTML = getHTML();
    unbind();
    bind();
}

const unbind = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((btn) => {
        const selectedBookID = btn.parentNode.id;
        btn.removeEventListener('click', deleteBookEventFn.bind(event, selectedBookID));
    });

    const readToggles = document.querySelectorAll('.read_toggle_input');
    readToggles.forEach((toggle) => {
        const selectedBookID = toggle.parentNode.parentNode.parentNode.id;
        toggle.removeEventListener('click', readToggleEventFn.bind(event, selectedBookID));
    });

    const addButton = document.querySelector('.add_book');
    addButton.removeEventListener('click', bookAddBtnEventFn);

    const formCloseButton = document.querySelector('.btn_cancel');
    formCloseButton.removeEventListener('click', formCloseEventFn);

    const formAddButton = document.querySelector('.btn_add');
    //warum funktioniert es hier mit dem .bind nicht aber oben schon?
    formAddButton.removeEventListener('click', formAddEventFn);
}

const bind = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((btn) => {
        const selectedBookID = btn.parentNode.id;
        btn.addEventListener('click', deleteBookEventFn.bind(event, selectedBookID));
    });

    const readToggles = document.querySelectorAll('.read_toggle_input');
    readToggles.forEach((toggle) => {
        const selectedBookID = toggle.parentNode.parentNode.parentNode.id;
        toggle.addEventListener('click', readToggleEventFn.bind(event, selectedBookID));
    });

    const addButton = document.querySelector('.add_book');
    addButton.addEventListener('click', bookAddBtnEventFn);

    const formCloseButton = document.querySelector('.btn_cancel');
    formCloseButton.addEventListener('click', formCloseEventFn);

    const formAddButton = document.querySelector('.btn_add');
    formAddButton.addEventListener('click', formAddEventFn);
}

const deleteBookEventFn = (selectedBookID) => {
    myLibrary.splice(getBookIndexById(selectedBookID), 1);
    render();
}

const readToggleEventFn = (selectedBookID) => {
    myLibrary[getBookIndexById(selectedBookID)].changeReadStatus();
}

const formAddEventFn = (event) => {
    event.preventDefault();
    addNewBook();
    document.querySelector(".popup_form").style.display = "none";
    render();
}

const boundFormAddEventFn = formAddEventFn.bind(null);

const formCloseEventFn = () => {
    document.querySelector(".popup_form").style.display = "none";
}

const bookAddBtnEventFn = () => {
    document.querySelector(".popup_form").style.display = "block";
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
    form.reset();
}

const header = () => {
    return `<div class="header"><div class="title">My Library</div><button class="add_book">+</button></div>`;
}

const readToggle = (isRead) => {
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
        ${readToggle(book.isRead)}
        <div class="delete"><i class="fa fa-trash-can"></i></div>
    </div>`;
}

const bookCards = () => {
    return myLibrary.map((book, index) => {
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
