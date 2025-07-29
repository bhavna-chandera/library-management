import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { setFilter } from "../../features/library/librarySlice.ts";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.library.filter);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search only subjects..."
        className="w-full p-2 border rounded"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
}
