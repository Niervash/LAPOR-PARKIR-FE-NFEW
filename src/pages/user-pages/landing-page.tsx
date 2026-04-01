import React from "react";
import { UserLayout } from "../../layout";
import { AboutMe, CallToAction, HowItWorks, MainHero } from "../../component";
import { MapPage } from "../../component/main-map";

const UserPage: React.FC = () => {
  return (
    <div>
      <UserLayout>
        <MainHero /> 
        <AboutMe />
        <HowItWorks />
        <MapPage />
        <CallToAction />
      </UserLayout>
    </div>
  );
};

export default UserPage;
