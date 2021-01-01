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

//Alert Prototype
UI.prototype.showAlert = function(msg,className){
    //Create a div
    const div = document.createElement('h4');
    //add class
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector('.container');
    //Get from
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 secs
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000);
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

    //Validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please Fill All The Fields','error');
    }else{
        //Add a book
        ui.addBookList(book);

        //Show alert
        ui.showAlert('Book Added Sucessfully!','success');

        //Clear fileds
        ui.clearFields();
    }

    e.preventDefault();
})