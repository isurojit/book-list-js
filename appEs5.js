//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI(){}

UI.prototype.addBookList = function(book){
    const list = document.querySelector('#book-list');
    //Create an Element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

//Clear filed prototype
UI.prototype.clearFields = function(){
    const title = document.querySelector('#title').value = '',
          author = document.querySelector('#author').value='',
          isbn = document.querySelector('#isbn').value='';
}

//Event Listners
document.querySelector('#book-form').addEventListener('submit',function(e){
    //Get from Values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //Instansiating a book
    const book = new Book(title,author,isbn);

    //Instansiating UI 
    const ui = new UI();

    //Add a book
    ui.addBookList(book);

    //Clear fileds
    ui.clearFields();

    e.preventDefault();
})