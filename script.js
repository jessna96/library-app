let myLibrary = [
    new Book('Harry Potter','J. K. Rowling', 234, true),
    new Book('Twilight','Author Name', 8764, false)
];

function Book(title, author, nrOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.nrOfPages = nrOfPages;
    this.isRead = isRead;
    this.info = function () {
        return `${title} by ${author}, ${nrOfPages} pages, ${
            !isRead ? "not" : "already"
        } read ${!isRead ? "yet" : ""}`;
    };
}

function addBookToLibrary() {
    let book = new Book();
    book.title = prompt('Title: ');
    book.author = prompt('Author: ');
    book.nrOfPages = prompt('Number of pages: ');
    book.isRead = prompt('Did you red it? (yes, no): ') === 'yes';
    myLibrary.push(book);
}

// addBookToLibrary();

