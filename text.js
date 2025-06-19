
//WHAT TO FIX TOMORROW:
//DELETE button to remove elements from the array too
//READ status to be changed by adding a function to the Books prototype


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${read}`)
    }
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

const acotar = new Book("A Court Of Thorns And Roses", "S.J.M", 356, "read");
myLibrary.push(acotar);



function addBookToLibrary() {
    
    let whatTitle = document.getElementById("title").value;
    let whatAuthor = document.getElementById("author").value;
    let howManyPages = document.getElementById("pages").value;
    let haveRead = document.getElementById("read-book").checked;

    let newBook = new Book(whatTitle, whatAuthor, howManyPages, haveRead);


    if( whatTitle === "" ||
        whatAuthor === "" ||
        howManyPages === "" 
    ){
        alert("Please fill in all the fields first");
    } else {

        myLibrary.push(newBook);

        let newDiv = document.createElement("div")
        newDiv.classList.add("book");
        newDiv.dataset.id = newBook.id;
        if (haveRead) {
            newDiv.style.borderLeft = "20px solid var(--dark-grey)"
        } else {
            newDiv.style.borderLeft = "20px solid var(--middle-beige)"
        }
        document.querySelector(".books").appendChild(newDiv);

        let bookTitle = document.createElement("h2")
        bookTitle.classList.add("title");
        bookTitle.textContent = newBook.title;

        let bookAuthor = document.createElement("h3")
        bookAuthor.classList.add("author");
        bookAuthor.textContent = newBook.author;

        let bookPages = document.createElement("p")
        bookPages.classList.add("pages");
        bookPages.textContent = `${newBook.pages} pages`;

        let controlsDiv = document.createElement("div")
        controlsDiv.classList.add("controls")

        let readBtn = document.createElement("button")
        readBtn.classList.add("read-btn")
        if(haveRead) {
            readBtn.textContent = "Read";
        } else {
            readBtn.textContent = "Not Read"
        }

        readBtn.addEventListener("click", function (e) {
            const parentBook = e.target.closest(".book");
            const bookId = parentBook.dataset.id;
            const matchedBook = myLibrary.find(book => book.id === bookId);
            if (matchedBook) {
                matchedBook.toggleRead(readBtn, parentBook);
            }
        });

        let deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-btn")
        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", function(e) {
            const book = e.target.closest(".book");
            const bookId = book.dataset.id;
            book.remove();
            
            const index = myLibrary.findIndex(book => book.id === bookId);
                if (index !== -1) {
                    myLibrary.splice(index, 1);
                }
        });
            

        newDiv.appendChild(bookTitle);
        newDiv.appendChild(bookAuthor);
        newDiv.appendChild(bookPages);
        newDiv.appendChild(controlsDiv);
        controlsDiv.appendChild(readBtn);
        controlsDiv.appendChild(deleteBtn);
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
})




