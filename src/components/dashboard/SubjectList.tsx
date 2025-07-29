import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import {
  addSubject,
  editSubject,
} from "../../features/library/librarySlice.ts";
import AuthorList from "./AuthorList.tsx";

export default function SubjectList() {
  const subjects = useAppSelector((state) => state.library.subjects);
  const filter = useAppSelector((state) => state.library.filter);
  const dispatch = useAppDispatch();

  const [newSubject, setNewSubject] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const filteredSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📚 Library Subjects
      </h1>

      {/* Add Subject Input */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-1">
          ➕ Add New Subject
        </label>
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button
            onClick={() => {
              if (newSubject.trim()) {
                dispatch(addSubject({ name: newSubject }));
                setNewSubject("");
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Subject List */}
      {filteredSubjects.length === 0 ? (
        <div className="text-gray-500 italic">No subjects found.</div>
      ) : (
        <ul className="space-y-6">
          {filteredSubjects.map((sub) => (
            <li
              key={sub.id}
              className="p-5 bg-gray-50 border border-gray-200 rounded shadow-sm"
            >
              {editId === sub.id ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Edit Subject Name
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => {
                      dispatch(editSubject({ id: sub.id, name: editName }));
                      setEditId(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xl text-gray-800">
                    📘 {sub.name}
                  </span>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditId(sub.id);
                      setEditName(sub.name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Author and Book List */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  ✏️ Author Details
                </h3>
                <AuthorList subject={sub} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
