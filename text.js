const readBookPara = document.querySelector(".read-books-num")
const notReadBooks = document.querySelector(".not-read-books-num")
const totalBooks = document.querySelector(".total-books-num")

const myLibrary = [];

addDefaultBooks();
readBooksCount();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function(button, element) {
    if (this.read === true) {
        this.read = false;
        button.textContent = "Not read";
        element.style.borderLeft = "20px solid var(--middle-beige)";
    } else {
        this.read = true;
        button.textContent = "Read";
        element.style.borderLeft = "20px solid var(--dark-grey)";
    }
};

function addBookToLibrary() {
    
    let whatTitle = document.getElementById("title").value;
    let whatAuthor = document.getElementById("author").value;
    let howManyPages = document.getElementById("pages").value;
    let haveRead = document.getElementById("read-book").checked;

     if( whatTitle === "" ||
        whatAuthor === "" ||
        howManyPages === "" 
    ){
        alert("Please fill in all the fields first");
    } else {
        const newBook = new Book(whatTitle, whatAuthor, howManyPages, haveRead);
        myLibrary.push(newBook);

        const bookElement = createBookElement(newBook);
        document.querySelector(".books").appendChild(bookElement);
    }
}

function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read-book").checked = false;
}

const btn = document.querySelector(".add-book");
btn.addEventListener("click", function(e) {
    e.preventDefault();
    addBookToLibrary();
    clearInputs();
    readBooksCount();
})


function createBookElement(book) {
    const haveRead = document.getElementById("read-book").checked;
    const newDiv = document.createElement("div");
    newDiv.classList.add("book");
    newDiv.dataset.id = book.id;

        if (haveRead) {
            newDiv.style.borderLeft = "20px solid var(--dark-grey)"
        } else {
            newDiv.style.borderLeft = "20px solid var(--middle-beige)"
        }

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("title");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("h3");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p");
    bookPages.classList.add("pages");
    bookPages.textContent = `${book.pages} pages`;

    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("controls");

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.textContent = book.read ? "Read" : "Not read";

    readBtn.addEventListener("click", function (e) {
        const parentBook = e.target.closest(".book");
        const bookId = parentBook.dataset.id;
        const matchedBook = myLibrary.find(b => b.id === bookId);
        if (matchedBook) {
            matchedBook.toggleRead(readBtn, parentBook);
            readBooksCount();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (e) {
        const parentBook = e.target.closest(".book");
        const bookId = parentBook.dataset.id;
        parentBook.remove();
        readBooksCount();

        const index = myLibrary.findIndex(b => b.id === bookId);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    });

    controlsDiv.appendChild(readBtn);
    controlsDiv.appendChild(deleteBtn);

    newDiv.appendChild(bookTitle);
    newDiv.appendChild(bookAuthor);
    newDiv.appendChild(bookPages);
    newDiv.appendChild(controlsDiv);

    return newDiv;
}

function addDefaultBooks() {
    const defaultBooks = [
        { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, read: false },
        { title: "1984", author: "George Orwell", pages: 328, read: false },
        { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, read: false }
    ];

    defaultBooks.forEach(bookData => {
        const defaultBook = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
        myLibrary.push(defaultBook);
        const bookElement = createBookElement(defaultBook);
        document.querySelector(".books").appendChild(bookElement);
    });
}



function readBooksCount() {
    let readBookNum = 0
    let notReadNum = 0
    let totalNum = myLibrary.length
    for (book of myLibrary) {
        if(book.read === true) {
            readBookNum++
        } else {
            notReadNum++
        }
    }   
    readBookPara.textContent = readBookNum;
    notReadBooks.textContent = notReadNum;
    totalBooks.textContent = totalNum;
}