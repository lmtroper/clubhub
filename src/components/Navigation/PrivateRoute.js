import React from "react";
import { Routes, Route } from "react-router-dom";
import ExploreClubDescription from "pages/ExploreClubDescription";
import LandingPage from "pages/LandingPage";
import ExplorePage from "pages/ExplorePage";
import MyClubs from "pages/MyClubsPage";
import Dashboard from "pages/Dashboard";
import ClubBoardPage from "pages/ClubBoardPage";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const isUser = useSelector((state) => state.user.loggedIn);
  const isGuest = useSelector((state) => state.guest.guestMode);

  return (
      <Routes>
        <Route path="/" exact element={(isUser || isGuest) ? <Dashboard /> : <LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/clubs/:clubID" element={<ExploreClubDescription />} />
        <Route path="/clubboard/:clubID/" element={(isUser || isGuest) ? <ClubBoardPage /> : <LandingPage />} />
        <Route path="/myclubs" exact element={(isUser || isGuest) ? <MyClubs /> : <LandingPage />} />
        <Route path="/*" exact element={(isUser || isGuest) ? <Dashboard /> : <LandingPage />} />
      </Routes>
  );
}
