import { useState } from "react";
import BackButton from "../components/BackButton";
import ScreenTemplate from "../components/ScreenTemplate";
import { ButtonGroup } from "@rneui/themed";
import ReturnsGraph from "../components/ReturnsGraph";

const InvestmentGraphsScreen = ({navigation, route}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ScreenTemplate>
      <ButtonGroup 
        buttons={[
          "MONTHLY",
          "YEARLY"
        ]}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
        containerStyle={{height: 40}}
      />

      <ReturnsGraph 
        yearly={selectedIndex}
        investmentParams={route.params.investmentParams}
      />

      <BackButton />
    </ScreenTemplate>
  );
};

export default InvestmentGraphsScreen;
