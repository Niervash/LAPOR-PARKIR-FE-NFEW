import React from "react";
import { UserLayout } from "../../layout";
import { AboutMe, CallToAction, MainHero } from "../../component";
import { MapPage } from "../../component/main-map";

const UserPage: React.FC = () => {
  return (
    <div>
      <UserLayout>
        <MainHero />
        <AboutMe />
        <MapPage />
        <CallToAction />
      </UserLayout>
    </div>
  );
};

export default UserPage;
