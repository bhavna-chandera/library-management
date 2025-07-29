import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Book {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  books: Book[];
}

export interface Subject {
  id: string;
  name: string;
  authors: Author[];
}

interface LibraryState {
  subjects: Subject[];
  filter: string;
}

// Helpers to load/save from localStorage
const SUBJECTS_KEY = "library_subjects";

const loadSubjects = (): Subject[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(SUBJECTS_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const saveSubjects = (subjects: Subject[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  }
};

// Initial state from localStorage
const initialState: LibraryState = {
  subjects: loadSubjects(),
  filter: "",
};

// Slice
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<{ name: string }>) => {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: action.payload.name,
        authors: [],
      };
      state.subjects.push(newSubject);
      saveSubjects(state.subjects);
    },

    editSubject: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const subject = state.subjects.find((s) => s.id === action.payload.id);
      if (subject) {
        subject.name = action.payload.name;
        saveSubjects(state.subjects);
      }
    },

    addAuthor: (
      state,
      action: PayloadAction<{ subjectId: string; name: string }>
    ) => {
      const subject = state.subjects.find(
        (s) => s.id === action.payload.subjectId
      );
      if (subject) {
        const newAuthor: Author = {
          id: Date.now().toString(),
          name: action.payload.name,
          books: [],
        };
        subject.authors.push(newAuthor);
        saveSubjects(state.subjects);
      }
    },

    editAuthor: (
      state,
      action: PayloadAction<{
        subjectId: string;
        authorId: string;
        name: string;
      }>
    ) => {
      const subject = state.subjects.find(
        (s) => s.id === action.payload.subjectId
      );
      const author = subject?.authors.find(
        (a) => a.id === action.payload.authorId
      );
      if (author) {
        author.name = action.payload.name;
        saveSubjects(state.subjects);
      }
    },

    addBook: (
      state,
      action: PayloadAction<{
        subjectId: string;
        authorId: string;
        name: string;
      }>
    ) => {
      const subject = state.subjects.find(
        (s) => s.id === action.payload.subjectId
      );
      const author = subject?.authors.find(
        (a) => a.id === action.payload.authorId
      );
      if (author) {
        const newBook: Book = {
          id: Date.now().toString(),
          name: action.payload.name,
        };
        author.books.push(newBook);
        saveSubjects(state.subjects);
      }
    },

    editBook: (
      state,
      action: PayloadAction<{
        subjectId: string;
        authorId: string;
        bookId: string;
        name: string;
      }>
    ) => {
      const subject = state.subjects.find(
        (s) => s.id === action.payload.subjectId
      );
      const author = subject?.authors.find(
        (a) => a.id === action.payload.authorId
      );
      const book = author?.books.find((b) => b.id === action.payload.bookId);
      if (book) {
        book.name = action.payload.name;
        saveSubjects(state.subjects);
      }
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addSubject,
  editSubject,
  addAuthor,
  editAuthor,
  addBook,
  editBook,
  setFilter,
} = librarySlice.actions;

export default librarySlice.reducer;
