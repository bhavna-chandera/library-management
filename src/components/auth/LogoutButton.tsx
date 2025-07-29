import React from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { logout } from "../../features/auth/authSlice.ts";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <button
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      onClick={() => {
        dispatch(logout());
        navigate("/login");
      }}
    >
      Logout
    </button>
  );
}
