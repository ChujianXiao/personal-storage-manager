import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link, Outlet } from "react-router";
 

export default function () {
  const user = useUser(api);
  const signOut = useSignOut();
 
 

  if (!user) return null;

  return (
 
    <div>
      <nav style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "1rem",
        marginBottom: "2rem",
        borderBottom: "1px solid #dee2e6"
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link to="/signed-in" style={{ textDecoration: "none", color: "#333" }}>Rooms</Link>
            <Link to="/signed-in/profile" style={{ textDecoration: "none", color: "#333" }}>Profile</Link>
            <Link to="/signed-in/settings" style={{ textDecoration: "none", color: "#333" }}>Settings</Link>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span>Welcome, {user.firstName || user.email}</span>
            <button 
              onClick={signOut}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: "pointer"
              }}
            >Sign Out</button>
          </div>
        </div>
        </div>
      </nav>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}><Outlet /></main>
    </div>
  );
}
