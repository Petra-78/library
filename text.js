
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
  // take params, create a book then store it in the array
  let whatTitle = document.getElementById("title").value;
  let whatAuthor = document.getElementById("author").value;
  let howManyPages = document.getElementById("pages").value;
  let haveRead = document.getElementById("read-book").value;

    if( whatTitle === "" ||
        whatAuthor === "" ||
        howManyPages === "" 
    ){
        alert("Please fill in all the fields first");
    } else {

        let newBook = new Book(whatTitle, whatAuthor, howManyPages, haveRead);
        //the newBook objects current prototype is Array, then Object
        myLibrary.push(newBook);

        let newDiv = document.createElement("div")
        newDiv.classList.add("book");
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

        newDiv.appendChild(bookTitle);
        newDiv.appendChild(bookAuthor);
        newDiv.appendChild(bookPages);
    }

  newBook = "";
}

const btn = document.querySelector("button");
btn.addEventListener("click", function(e) {
    e.preventDefault();
    addBookToLibrary();
})

function logLibrary() {
  for (book in myLibrary) {
    console.log(book)
  }
}

document.querySelector(".title").textContent = acotar.title
document.querySelector(".author").textContent = acotar.author
document.querySelector(".pages").textContent = `${acotar.pages} pages`




