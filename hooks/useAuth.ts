"use client";

import { useCallback, useEffect, useState } from "react";
import type { Branch } from "@/lib/languageMeta";

export type User = {
  name: string;
  email: string;
  branch: Branch;
};

const STORAGE_KEY = "placement_mentor_user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, name?: string, branch: Branch = "cse") => {
    if (!email.trim() || !password.trim()) return false;
    const next: User = {
      name: name?.trim() || email.split("@")[0],
      email: email.trim().toLowerCase(),
      branch,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, ready, login, logout };
}
