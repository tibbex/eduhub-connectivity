
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export type UserRole = 'student' | 'teacher' | 'school';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: UserRole;
  name: string;
  phoneNumber: string;
  location: string;
  // Student specific
  age?: number;
  grade?: string;
  schoolName?: string;
  // Teacher specific
  teachingGrades?: string[];
  teachingSchool?: string;
  // School specific
  ceoName?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setUserProfile: (profile: UserProfile) => Promise<void>;
  isDemo: boolean;
  startDemo: (role: UserRole) => void;
  endDemo: () => void;
  demoTimeLeft: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [demoTimeLeft, setDemoTimeLeft] = useState(600); // 10 minutes in seconds
  const [demoTimer, setDemoTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile from Firestore
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserProfileState(docSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfileState(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Effect for demo mode countdown
  useEffect(() => {
    if (isDemo && demoTimeLeft > 0) {
      const timer = setInterval(() => {
        setDemoTimeLeft((prev) => {
          if (prev <= 1) {
            endDemo();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setDemoTimer(timer);
      return () => clearInterval(timer);
    }
  }, [isDemo, demoTimeLeft]);

  const setUserProfile = async (profile: UserProfile) => {
    try {
      if (currentUser) {
        await setDoc(doc(db, "users", currentUser.uid), profile);
        setUserProfileState(profile);
      }
    } catch (error) {
      console.error("Error setting user profile:", error);
      throw error;
    }
  };

  const startDemo = (role: UserRole) => {
    // Create a demo profile
    const demoProfile: UserProfile = {
      uid: 'demo-user',
      email: 'demo@example.com',
      role: role,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      phoneNumber: '555-0000',
      location: 'Demo City',
    };
    
    setUserProfileState(demoProfile);
    setIsDemo(true);
    setDemoTimeLeft(600); // Reset to 10 minutes
  };

  const endDemo = () => {
    if (demoTimer) {
      clearInterval(demoTimer);
    }
    setUserProfileState(null);
    setIsDemo(false);
    setDemoTimeLeft(600);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    setUserProfile,
    isDemo,
    startDemo,
    endDemo,
    demoTimeLeft
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
