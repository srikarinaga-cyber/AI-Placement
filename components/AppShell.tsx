"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePlacementMentor } from "@/hooks/usePlacementMentor";
import LoginPage from "@/components/LoginPage";
import PlacementMentorApp from "@/components/PlacementMentorApp";

export default function AppShell() {
  const { user, ready, login, logout } = useAuth();
  const app = usePlacementMentor(user, logout);

  useEffect(() => {
    if (user?.branch) app.setInterviewBranch(user.branch);
    if (user?.branch) app.setRoadmapForm({ ...app.roadmapForm, branch: user.branch });
  }, [user?.branch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return <div className="login-page loading-screen">Loading...</div>;
  }

  if (!user) {
    return <LoginPage lang={app.lang} setLanguage={app.setLanguage} onLogin={login} />;
  }

  return <PlacementMentorApp app={app} user={user} />;
}
