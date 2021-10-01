// Get UI elements
let form = document.querySelector('#book_form'),
// list = document.querySelector('#')
// book class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// Add Event Listener
form.addEventListener('submit', newBook); //সাব্মিট বাটন প্রেস করার পরে একটা ইভেন্ট ঘটবে সেটা হচ্ছে নতুন বই লিস্টে যোগ হবে।


// define functions
function newBook(e) {
    // console.log("hello");
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
   isbn = document.querySelector('#isbn').value;
    let book = new Book(title, author, isbn);
    console.log(book);


    e.preventDefault();
}