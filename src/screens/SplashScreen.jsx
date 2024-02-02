import React from 'react';
import ScreenTemplate from '../components/ScreenTemplate';
import { useAuthentication } from '../hooks/authentication';


const SplashScreen = ({ navigation, route }) => {
  const { isLoading } = useAuthentication();

  return (
    <ScreenTemplate loading={isLoading}>
      <ScreenTemplate.Logo/>
    </ScreenTemplate>
  );
};

export default SplashScreen;