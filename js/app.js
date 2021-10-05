// UI Book List constructor
class Book{
   constructor(){
   }

   // UI Constructor
   addBook(book){
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      //insert cols
      row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#">X</a></td>
      `;

      list.appendChild(row);
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


// Event Listener
document.getElementById('book-form').addEventListener('submit', e =>{
   //Get form values
   const book = {
      'title': document.getElementById('title').value,
      'author': document.getElementById('author').value,
      'isbn': document.getElementById('isbn').value
   };

   // instantiate book
   const bookService = new Book();

   try{
      if(book.title !== '' || book.author !== '' || book.isbn !== ''){
         // Add book to list
         bookService.addBook(book);
         bookService.showAlert('Add Book Success', 'alert alert-success')
      }else{
         bookService.showAlert('Please fill in all fields.', 'alert alert-danger');
      }
   }
   catch(err){
      console.log(err);
   }
   // Clear field values
   bookService.clearFields();

   e.preventDefault();
})
