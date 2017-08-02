This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is the myReads for the final assessment project for Udacity's React Fundamentals course, developed by [React Training](https://reacttraining.com).

Fork and clone your own version of this to use it.
run `npm install`
run `npm start`

## What You're Getting
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
 |-- manifest.json - Installed with react-create-app
+-- src/
 +-- icons/ - Images for app icons.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - Root of the app.
 |-- App.css - Styles for the app. Feel free to customize this as you desire.
 |-- App.test.js - Used for testing. Provided with Create React App.
 |-- Book.js - Book Component.
 |-- BooksAPI.js - A JavaScript API for the provided Udacity backend.
 |-- BookShelf.js - Book Shelf Component.
 |-- index.js - Used for DOM rendering only.
 |-- index.css - Global styles.
 |--ListOfBooks.js - List of Books Component.
 |-- MyBooksList.js - List of My Books Component.
 |-- Search.js - Search Component.
|-- .gitignore

|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms for you to use with the app.
|-- package.json - npm package manager file.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
