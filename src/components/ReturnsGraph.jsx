import { ListItem, Icon } from "@rneui/themed";
import { useMemo, useRef } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const ReturnsGraph = ({investmentParams, yearly}) => {
  const scrollviewRef = useRef();
  const timeRangeReturns = useMemo(() => {
    scrollviewRef.current?.scrollTo({
      x: 0,
      animated: true,
    });

    if (yearly) {
      return generateYearlyReturns(investmentParams);
    }
    return generateMontlyReturns(investmentParams);
  }, [investmentParams, yearly]);
  const graphData = useMemo(() => (generateIncrementalReturns(timeRangeReturns)
  ), [timeRangeReturns]);

  return (
    <View>
    <ScrollView horizontal ref={scrollviewRef} style={{marginBottom: 20, marginTop: 10}}>
      <BarChart 
        data={{
          labels: graphData.map(item => item.timeRange),
          datasets: [{ data: graphData.map(exp => exp.amount) }]
        }}
        width={Dimensions.get('screen').width * 1.5}
        height={230}
        yAxisLabel="$"
        chartConfig={graphConfig}
        verticalLabelRotation={30}
        absolute={true}
        fromZero={true}
      />
    </ScrollView>
    <ScrollView style={{height: 300}}>
      {timeRangeReturns.map((item) => (
        <ListItem bottomDivider key={item.timeRange}>
          <Icon name="calendar" type="entypo" />
          <ListItem.Content>
            <ListItem.Title>{item.timeRange}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Title right style={{color: item.amount < 0? 'red' : 'green'}}>{item.amount}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
    </View>
  );
};

const generateGraphData = (invParams) => {
  const downPaymentDate = new Date();
  const graphData = [{
    month: downPaymentDate.getMonth() + 1,
    year: downPaymentDate.getFullYear(),
    amount: invParams.downPaymentAmount * (-1)
  }];

  let currentDate = new Date(invParams.depositStartTimestamp);
  let i;
  for(i = 0; i < invParams.maxNumberOfDeposits; i++){
    graphData.push({
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      amount: invParams.depositAmount
    })
    currentDate = addDaysToDate(invParams.depositIntervalInDays, currentDate);
  }

  return graphData;
};

const generateMontlyReturns = (invParams) => {
  const graphData = generateGraphData(invParams);
  const timeRangeAmounts = {};

  for (const item of graphData) {
    let timeRange = `${item.month}/${item.year}`;
    if (!Object.keys(timeRangeAmounts).includes(timeRange)) {
      timeRangeAmounts[timeRange] = item.amount;
      continue;
    }
    timeRangeAmounts[timeRange] += item.amount;
  }

  const montlyReturns = Object.entries(timeRangeAmounts)
  .map((keyValuePair) => ({ timeRange: keyValuePair[0], amount: keyValuePair[1] }));
  return montlyReturns;
};

const generateYearlyReturns = (invParams) => {
  const graphData = generateGraphData(invParams);
  const timeRangeAmounts = {};

  for (const item of graphData) {
    let timeRange = `${item.year}`;
    if (!Object.keys(timeRangeAmounts).includes(timeRange)) {
      timeRangeAmounts[timeRange] = item.amount;
      continue;
    }
    timeRangeAmounts[timeRange] += item.amount;
  }

  const yearlyReturns = Object.entries(timeRangeAmounts).map((keyValuePair) => ({ timeRange: keyValuePair[0], amount: keyValuePair[1] }));
  return yearlyReturns;
};

const generateIncrementalReturns = (timeRangeReturns) => {
  const timeRangesWithIncrementalReturns = [];

  for (let i=0; i<timeRangeReturns.length; i++){
    if(i-1 >= 0){
      timeRangesWithIncrementalReturns.push({
        timeRange: timeRangeReturns[i].timeRange,
        amount: timeRangesWithIncrementalReturns[i-1].amount + timeRangeReturns[i].amount
      })
      continue;
    }
    timeRangesWithIncrementalReturns.push({
      timeRange: timeRangeReturns[i].timeRange,
      amount: timeRangeReturns[i].amount
    })
  }

  return timeRangesWithIncrementalReturns;
}

const addDaysToDate = (days, date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const graphConfig = {
  backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    fillShadowGradientFromOpacity: 0.9,
    fillShadowGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(232, 109, 195, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(52, 52, 52, ${opacity})`,
    bgColor: "white",
    propsForLabels: {
      fontSize: 12,
    },
    decimalPlaces: 0,
    barPercentage: 0.5,
};

export default ReturnsGraph;
