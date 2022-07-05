const incompleteBookshelfList = "incompleteBookshelfList";
const inputBookIsComplete = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const incomple_teBooks_helfList = document.getElementById(incompleteBookshelfList);
  const input_Book_Is_Complete = document.getElementById(inputBookIsComplete);
  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = document.getElementById("inputBookYear").value;
  const chatBox = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(inputBookTitle, inputBookAuthor, parseInt(inputBookYear), chatBox);
  const bookObject = composeBookObject(inputBookTitle, inputBookAuthor, parseInt(inputBookYear), false);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (chatBox) {
    input_Book_Is_Complete.append(book);
  } else {
    incomple_teBooks_helfList.append(book);
  }

  updateDataToStorage();
}

function makeBook(judul, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerHTML = judul;

  const penulis = document.createElement("p");
  penulis.innerHTML = "Penulis : " + '<span class="author">' + author + "</span>";

  const tahun = document.createElement("p");
  tahun.innerHTML = "Tahun : " + '<span class="year">' + year + "</span>";

  const textContainer = document.createElement("div");
  textContainer.classList.add("action");

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(bookTitle, penulis, tahun, textContainer);

  if (isComplete) {
    container.append(undoButton(), trashButton());
  } else {
    container.append(createCheckButton(), trashButton());
  }

  return container;
}

function createButton(buttonTypeClass, text, eventListener) {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}
function addBookToCompleted(bookElement) {
  const input_Book_Is_Complete = document.getElementById(inputBookIsComplete);
  const inputBookTitle = bookElement.querySelector("h3").innerText;
  const inputBookAuthor = bookElement.querySelector(".author").innerText;
  const inputBookYear = bookElement.querySelector(".year").innerText;
  const newBokk = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBokk[BOOK_ITEMID] = book.id;
  input_Book_Is_Complete.append(newBokk);
  bookElement.remove();
  updateDataToStorage();
}

function undoChekButton(bookElement) {
  const incomple_teBooks_helfList = document.getElementById(incompleteBookshelfList);
  const inputBookTitle = bookElement.querySelector("h3").innerText;
  const inputBookAuthor = bookElement.querySelector(".author").innerText;
  const inputBookYear = bookElement.querySelector(".year").innerText;
  const undoBokk = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  undoBokk[BOOK_ITEMID] = book.id;
  incomple_teBooks_helfList.append(undoBokk);
  bookElement.remove();
  updateDataToStorage();
}

function removeBokk(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  bookElement.remove();
  updateDataToStorage();
}

function createCheckButton() {
  return createButton("green", "Selesai dibaca", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function undoButton() {
  return createButton("green", "Belum Selesai diBaca", function (event) {
    undoChekButton(event.target.parentElement);
  });
}

function trashButton() {
  return createButton("red", "Hapus", function (event) {
    alert("Yakin mau d hapus ?");
    removeBokk(event.target.parentElement);
  });
}

// const searchButton = document.getElementById("searchSubmit");
// searchButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   const search1 = document.getElementById("searchBookTitle").value;
//   const search2 = document.querySelectorAll(".book_item");
//   for (buku of search2) {
//     const judul = buku.innerText;

//     if (judul.includes(search1)) {
//       buku.style.display = "block";
//     } else {
//       buku.style.display = "none";
//     }
//   }
// });

document.getElementById("searchSubmit").addEventListener("click", function (event) {
  event.preventDefault();
  const search1 = document.getElementById("searchBookTitle").value;
  const search2 = document.querySelectorAll(".book_item");

  for (buku of search2) {
    const judul = buku.innerText;
    if (judul.includes(search1)) {
      buku.style.display = "block";
    } else {
      buku.style.display = "none";
    }
  }
});

function refreshDataBooks() {
  const incomple_teBooks_helfList = document.getElementById("incompleteBookshelfList");
  let input_Book_Is_Complete = document.getElementById("completeBookshelfList");

  for (buk of books) {
    const newBook = makeBook(buk.Title, buk.Author, buk.Year, buk.isCompleted);
    newBook[BOOK_ITEMID] = buk.id;

    if (buk.isCompleted) {
      input_Book_Is_Complete.append(newBook);
    } else {
      incomple_teBooks_helfList.append(newBook);
    }
  }
}
