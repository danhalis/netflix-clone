import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => Promise<boolean>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => true,
  logIn: async () => true,
  logOut: async () => true,
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Set an initializing state while Firebase connects
  // This state will block UI from being rendered until
  // the Firebase is connected
  const [initializing, setInitializing] = useState(true);
  useEffect(
    () =>
      // Add an observer for changes to the user's auth state.
      // and return an unsubscribe function to clean up
      auth.onAuthStateChanged(
        // Once a connection with Firebase is established
        // callback will be triggered when the auth state changes
        (user) => {
          // If the user is logged in
          if (user) {
            setUser(user);
            setLoading(false);
          }
          // If the user is not logged in
          else {
            setUser(null);
            setLoading(false);
            router.push("/signin");
          }

          // At this point, we have the user's sign-in state
          // Unblock UI rendering
          setInitializing(false);
        }
      ),
    []
  );

  const handleFirebaseError = (error: any) => {
    if (error.code == "auth/email-already-in-use") {
      alert("The email address is already in use");
    } else if (error.code == "auth/operation-not-allowed") {
      alert("Operation not allowed.");
    } else if (error.code == "auth/weak-password") {
      alert(error.message);
    } else if (
      error.code == "auth/user-not-found" ||
      error.code == "auth/wrong-password"
    ) {
      alert("You entered a wrong email or a wrong password");
    } else {
      alert(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    let success = false;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user);
        router.push("/");
        success = true;
      })
      .catch((error: Error) => {
        setUser(null);
        handleFirebaseError(error);
      })
      .finally(() => setLoading(false));

    return success;
  };

  const logIn = async (email: string, password: string) => {
    setLoading(true);

    let success = false;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user);
        router.push("/");
        success = true;
      })
      .catch((error: Error) => {
        setUser(null);
        handleFirebaseError(error);
      })
      .finally(() => setLoading(false));

    return success;
  };

  const logOut = async () => {
    setLoading(true);

    let success = false;
    await signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/signin");
        success = true;
      })
      .catch((error: Error) => handleFirebaseError(error))
      .finally(() => setLoading(false));

    return success;
  };

  const memoizedValue = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logOut,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
