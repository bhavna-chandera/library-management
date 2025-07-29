import React from "react";
import LogoutButton from "../components/auth/LogoutButton.tsx";
import SubjectList from "../components/dashboard/SubjectList.tsx";
import SearchBar from "../components/dashboard/SearchBar.tsx";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Library Dashboard</h1>
        <LogoutButton />
      </div>
      <SearchBar />
      <div className="mt-6">
        <SubjectList />
      </div>
    </div>
  );
}
