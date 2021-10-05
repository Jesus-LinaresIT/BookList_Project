// UI Book List constructor
class Book{
   constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }

   // UI Constructor
   addBook(title, author, isbn){
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      //insert cols
      row.innerHTML = `
         <td>${title}</td>
         <td>${author}</td>
         <td>${isbn}</td>
         <td><a href="#">X</a></td>
      `;

      list.appendChild(row);
   }

   // Clear field
   clearFields = () => {
      document.getElementById('title').value = '';
      document.getElementById('author').value= '';
      document.getElementById('isbn').value = '';
   }
}

// Event Listener
document.getElementById('book-form').addEventListener('submit', e =>{
   //Get form values
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value;
   // instantiate book
   const book = new Book();
   // Add book to list
   try{
      book.addBook(title, author, isbn);
   }
   catch(err){
      console.log(err);
   }

   // Clear field values
   book.clearFields();

   e.preventDefault();
})
