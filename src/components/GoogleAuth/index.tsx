import React, { useEffect, useRef } from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import type { GoogleUser } from "../../types/google-auth";
import "./styles.css";

interface GoogleAuthProps {
  onSuccess?: (user: GoogleUser) => void;
  onError?: (error: string) => void;
}

export const GoogleAuth: React.FC<GoogleAuthProps> = ({
  onSuccess,
  onError,
}) => {
  const { user, isAuthenticated, isLoading, signIn, signOut } = useGoogleAuth();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated && user && onSuccess) {
      onSuccess(user);
    }
  }, [isAuthenticated, user, onSuccess]);

  useEffect(() => {
    // Render Google Sign-In button when component mounts and user is not authenticated
    if (!isLoading && !isAuthenticated && buttonRef.current && window.google) {
      try {
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 250,
        });
      } catch (error) {
        console.error("Error rendering Google Sign-In button:", error);
        if (onError) {
          onError("Failed to render Google Sign-In button");
        }
      }
    }
  }, [isLoading, isAuthenticated, onError]);

  if (isLoading) {
    return (
      <div className="google-auth-loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="google-auth-profile">
        <div className="user-info">
          <img src={user.picture} alt={user.name} className="user-avatar" />
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <button onClick={signOut} className="sign-out-button">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="google-auth-container">
      <div ref={buttonRef} className="google-sign-in-button"></div>
      {/* <button onClick={signIn} className="custom-sign-in-button">
        Sign in with Google
      </button> */}
    </div>
  );
};
