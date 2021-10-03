// Get UI elements
let form = document.querySelector('#book_form');
let bookList=document.querySelector('#book_list');
// book class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static addToBookList(book){
        // console.log(book)
        let bookList = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        bookList.appendChild(row);

        // console.log(row);
    }
    static clearFields(){ //এই ফাংশন ডাটা পাওয়ার পরে ইনপুট ফর্ম গুলো খালি করে দিবে 
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book_form');
        container.insertBefore(div, form);

        setTimeout(() => {  //এই ফাংশনটা এলার্টের জন্য একটা টাইম সেট করে দেয়।
            document.querySelector('.alert').remove()
        }, 2000);
    }
    static deleteBook(target) {
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim()) //remove book from local store permanently
            UI.showAlert("Book Removed!", "remove");
        }
    }
}
// store in local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books =Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayBooks(){
        let books =Store.getBooks();
        books.forEach(book => {
            UI.addToBookList(book);
        });
    }
    static removeBook(isbn){
        let books =Store.getBooks();
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}





// Add Event Listener
form.addEventListener('submit', newBook); //সাব্মিট বাটন প্রেস করার পরে একটা ইভেন্ট ঘটবে সেটা হচ্ছে নতুন বই লিস্টে যোগ হবে।
bookList.addEventListener('click', removeBook); //সাব্মিট বাটন প্রেস করার পরে একটা ইভেন্ট ঘটবে সেটা হচ্ছে বই লিস্ট থেকে ডিলিট হবে।
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// define functions
function newBook(e) {
    // console.log("hello");
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
   isbn = document.querySelector('#isbn').value;
    let book = new Book(title, author, isbn);
    if(title=== '' || author=== '' || isbn=== ''){
        UI.showAlert("Please Fill All The Fields to Continue!", "error")
    }else{
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert("Book added Successfully!", "success");
        
        Store.addBook(book);
    }
    

    e.preventDefault();
}
function removeBook(e){
   UI.deleteBook(e.target);

   e.preventDefault();
}