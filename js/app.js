// UI Book List constructor
class Book{
   constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI{
   addBook(book){
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      //insert cols
      row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a class='delete-item' href="#">X</a></td>
      `;

      list.appendChild(row);
   }

   // Delete Book
   deleteBook(target){
      if(target.className === 'delete-item'){
         target.parentElement.parentElement.remove();
      }
   }

   // Show Alert
   showAlert(msg, className){
      // Create div
      const div = document.createElement('div');
      div.className = className;
      div.appendChild(document.createTextNode(msg));

      // Get parent element
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      // insert alert
      container.insertBefore(div, form);

      setTimeout(()=> {
         document.querySelector('.alert').remove();
      }, 3000)
   }

   // Clear field
   clearFields = () => {
      document.getElementById('title').value = '';
      document.getElementById('author').value= '';
      document.getElementById('isbn').value = '';
   }
}

// Local Storage Class
class Store{
   static getBooks(){
      let books = [];
      if(localStorage.getItem('books')===null){
         books = [];
      } else{
         books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
   }

   static displayBooks(book){
     const books = Store.getBooks();

     books.forEach(book => {
        const ui = new UI();

        ui.addBook(book);
     });

   }

   static addBooks(book){
     const books = Store.getBooks();
     books.push(book);

     localStorage.setItem('books', JSON.stringify(books));

   }

   static removeBooks(isbn){
      const books = Store.getBooks();
      books.forEach((book, index) => {
         if(book.isbn === isbn){
            books.splice(index, 1)
         }
      });

     localStorage.setItem('books', JSON.stringify(books));

   }
}


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener
document.getElementById('book-form').addEventListener('submit', e =>{
   //Get form values
   const bookValues = {
      'title': document.getElementById('title').value,
      'author': document.getElementById('author').value,
      'isbn': document.getElementById('isbn').value
   };
   const {title, author, isbn} = bookValues;

   // instantiate book
   const book = new Book(title, author, isbn);
   const ui = new UI();

   try{
      if(title !== '' || author !== '' || isbn !== ''){
         // Add book to list
         ui.addBook(book);

         // Add LS
         Store.addBooks(book)

         ui.showAlert('Add Book Success', 'alert alert-success')
      }else{
         ui.showAlert('Please fill in all fields.', 'alert alert-danger');
      }
   }
   catch(err){
      console.log(err);
   }
   // Clear field values
   ui.clearFields();

   e.preventDefault();
})


document.getElementById('book-list').addEventListener('click', e =>{
   const ui = new UI();
   ui.deleteBook(e.target);

   // Remove book LS
   Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

   //Show alert delete book success
   ui.showAlert('Delete Book Success', 'alert alert-info')

   e.preventDefault();
})
