import React from 'react';

const Book = ({ book, handleOnClick }) => {
    return (
        <ul onClick={() => handleOnClick(book.id)}>{book.title}</ul>
    )
}

export default Book