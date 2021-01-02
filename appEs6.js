//Book class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI class
class UI{
    addBookList(book){
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

    showAlert(msg,className){
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

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        const title = document.querySelector('#title').value = '',
          author = document.querySelector('#author').value='',
          isbn = document.querySelector('#isbn').value='';
    }
}

//Local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books =[]
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            //addbooks
            ui.addBookList(book);
        });
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book ,index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//dom load event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//Event Listners for add book
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

        //add to LS
        Store.addBook(book);

        //Show alert
        ui.showAlert('Book Added Sucessfully!','success');

        //Clear fileds
        ui.clearFields();
    }

    e.preventDefault();
})

//Event listner for delete
document.querySelector('#book-list').addEventListener('click', function(e){

    //instantiate ui
    const ui = new UI();

    ui.deleteBook(e.target);

    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show msg
    ui.showAlert('Book Deleted Sucessfully!','success')

    e.preventDefault();
});