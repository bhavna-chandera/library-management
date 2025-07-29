import React, { useState } from "react";
import {
  Author,
  addBook,
  editBook,
} from "../../features/library/librarySlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

type BookListProps = {
  subjectId: string;
  author: Author;
};

type ExtendedBook = {
  id: string;
  name: string;
  authorName: string;
  subjectName: string;
};

export default function BookList({ subjectId, author }: BookListProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.library.filter);
  const [newBook, setNewBook] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const books: ExtendedBook[] = useAppSelector((state) =>
    state.library.subjects.flatMap((subject) =>
      subject.authors.flatMap((auth) =>
        auth.books.map((book) => ({
          ...book,
          authorName: auth.name,
          subjectName: subject.name,
        }))
      )
    )
  );

  const filteredBooks = books.filter((book) =>
    [book.name, book.authorName, book.subjectName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="ml-6 mt-4 p-4 border rounded-md shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        📚 Books by {author.name}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter new book title"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            if (newBook.trim()) {
              dispatch(
                addBook({ subjectId, authorId: author.id, name: newBook })
              );
              setNewBook("");
            }
          }}
        >
          ➕ Add Book
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-gray-500 italic">No books found.</div>
      ) : (
        <ul className="space-y-2">
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              className="flex items-center justify-between bg-white p-2 rounded-md border"
            >
              {editId === book.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="flex-1 p-1 border rounded"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      dispatch(
                        editBook({
                          subjectId,
                          authorId: author.id,
                          bookId: book.id,
                          name: editName,
                        })
                      );
                      setEditId(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-800">{book.name}</span>
                  <button
                    className="text-blue-600 hover:underline ml-4"
                    onClick={() => {
                      setEditId(book.id);
                      setEditName(book.name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
