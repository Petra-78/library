
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

const acotar = new Book("A Court Of Thorns And Roses", "S.J.M", 356, "read");
myLibrary.push(acotar);



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

        let newBook = new Book(whatTitle, whatAuthor, howManyPages, haveRead);
       
        myLibrary.push(newBook);

        let newDiv = document.createElement("div")
        newDiv.classList.add("book");
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

        readBtn.addEventListener("click", function(e) {
            if(readBtn.textContent === "Read") {
                readBtn.textContent = "Not read"
                const parentBook = e.target.closest(".book");
                parentBook.style.borderLeft = "20px solid var(--middle-beige)"
            } else {
                readBtn.textContent = "Read"
                const parentBook = e.target.closest(".book");
                parentBook.style.borderLeft = "20px solid var(--dark-grey)"
            }
        });

        let deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete-btn")
        deleteBtn.textContent = "Delete"

        deleteBtn.addEventListener("click", function(e) {
            const book = e.target.closest(".book");
            book.remove(); 
        });


        
        newDiv.appendChild(bookTitle);
        newDiv.appendChild(bookAuthor);
        newDiv.appendChild(bookPages);
        newDiv.appendChild(controlsDiv);
        controlsDiv.appendChild(readBtn);
        controlsDiv.appendChild(deleteBtn);
    }

  newBook = "";
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

// document.querySelector(".title").textContent = acotar.title
// document.querySelector(".author").textContent = acotar.author
// document.querySelector(".pages").textContent = `${acotar.pages} pages`


const readBtns = document.querySelectorAll(".read-btn")
readBtns.forEach ((readBtn) => {
readBtn.addEventListener("click", function(e) {
    if(readBtn.textContent === "Read") {
        readBtn.textContent = "Not read"
        const parentBook = e.target.closest(".book");
        parentBook.style.borderLeft = "20px solid var(--middle-beige)"
    } else {
        readBtn.textContent = "Read"
        const parentBook = e.target.closest(".book");
        parentBook.style.borderLeft = "20px solid var(--dark-grey)"
    }
});
})


