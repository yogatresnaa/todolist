const STORAGE_KEY = "DATA_BUKU";

let books = [];
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser Kamu tidak mendukung local storage");
    return false;
  }
  return true;
}
function saveDataBook() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}
function loadDataFromStorage() {
  const serialData = localStorage.getItem(STORAGE_KEY);
  let dataBuku = JSON.parse(serialData);
  if (dataBuku !== null) books = dataBuku;
  document.dispatchEvent(new Event("ondataloaded"));
}
function updateDataToStorage() {
  if (isStorageExist()) saveDataBook();
}

function composeBookObject(Title, Author, Year, isCompleted) {
  return {
    id: +new Date(),
    Title,
    Author,
    Year,
    isCompleted,
  };
}

function findBook(booksId) {
  for (book of books) {
    if (book.id === booksId) return book;
  }
  return null;
}

function findBookIndex(booksId) {
  let index = 0;
  for (book of books) {
    if (book.id === booksId) return index;

    index++;
  }

  return -1;
}
