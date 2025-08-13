import { useState, useEffect, useCallback } from "react";
import {
  GoogleUser,
  GoogleAuthResponse,
  GoogleProfile,
} from "../types/google-auth";

const CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "164958565407-i8vpb6bo2dqhlfslch3njmnnl0mdat4v.apps.googleusercontent.com";

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Decode JWT token to get user profile
  const decodeJWT = (token: string): GoogleProfile | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Handle successful Google sign-in
  const handleCredentialResponse = useCallback(
    (response: GoogleAuthResponse) => {
      const profile = decodeJWT(response.credential);

      if (profile) {
        const googleUser: GoogleUser = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
        };

        setUser(googleUser);
        setIsAuthenticated(true);

        // Store user data in localStorage for persistence
        localStorage.setItem("googleUser", JSON.stringify(googleUser));

        console.log("User signed in:", googleUser);
      }
      setIsLoading(false);
    },
    []
  );

  // Initialize Google Sign-In
  const initializeGoogleSignIn = useCallback(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      setIsLoading(false);
    }
  }, [handleCredentialResponse]);

  // Sign out function
  const signOut = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("googleUser");

    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }

    console.log("User signed out");
  }, []);

  // Sign in function (triggers the Google sign-in popup)
  const signIn = useCallback(() => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  }, []);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("googleUser");
      }
    }
    setIsLoading(false);
  }, []);

  // Initialize Google Sign-In when the script loads
  useEffect(() => {
    // Check if Google Identity Services script is already loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      // Wait for the script to load
      const checkGoogle = () => {
        if (window.google) {
          initializeGoogleSignIn();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
    }
  }, [initializeGoogleSignIn]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
};
