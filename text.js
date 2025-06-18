
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

function addBookToLibrary() {
  // take params, create a book then store it in the array
  let whatTitle = prompt("What is the title of the book?");
  let whatAuthor = prompt("Who is the author?");
  let howManyPages = prompt("How many pages is it?");
  let haveRead = prompt("Have you read it yet?");

  let newBook = new Book(whatTitle, whatAuthor, howManyPages, haveRead);
  //the newBook objects current prototype is Object
  myLibrary.push(newBook);

  newBook = "";
}


