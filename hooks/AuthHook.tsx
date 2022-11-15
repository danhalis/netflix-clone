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
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(
    () =>
      // Add an observer for changes to the user's sign-in state.
      // and return an unsubscribe function to clean up
      onAuthStateChanged(
        auth,
        // callback triggered on change
        (user) => {
          if (user) {
            // Logged in...
            setUser(user);
            setLoading(false);
          } else {
            // Not logged in...
            setUser(null);
            setLoading(true);
            router.push("/signin");
          }

          setInitialLoading(false);
        }
      ),
    [auth]
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
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
