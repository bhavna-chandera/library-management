import React, { useState } from "react";
import {
  Subject,
  addAuthor,
  editAuthor,
} from "../../features/library/librarySlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import BookList from "./BookList.tsx";

type AuthorListProps = { subject: Subject };

export default function AuthorList({ subject }: AuthorListProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.library.filter);
  const [newAuthor, setNewAuthor] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const filteredAuthors = subject.authors.filter((a) =>
    a.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="ml-6 mt-4">
      {/* Add Author Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded shadow-sm"
          placeholder="Add author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={() => {
            if (newAuthor.trim()) {
              dispatch(addAuthor({ subjectId: subject.id, name: newAuthor }));
              setNewAuthor("");
            }
          }}
        >
          Add Author
        </button>
      </div>

      {/* Author Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Authors:</h3>
        <ul className="space-y-4">
          {filteredAuthors.length === 0 && (
            <div className="text-gray-500">No authors found.</div>
          )}

          {filteredAuthors.map((author) => (
            <li
              key={author.id}
              className="p-4 border rounded shadow-sm bg-gray-50"
            >
              {editId === author.id ? (
                <div className="flex gap-2 mb-2">
                  <input
                    className="p-2 border rounded flex-1"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button
                    className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
                    onClick={() => {
                      dispatch(
                        editAuthor({
                          subjectId: subject.id,
                          authorId: author.id,
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
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-lg">{author.name}</span>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => {
                      setEditId(author.id);
                      setEditName(author.name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Books Section */}
              <div className="ml-2 mt-2">
                <h4 className="font-semibold text-gray-700 mb-1">Books:</h4>
                <BookList subjectId={subject.id} author={author} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
