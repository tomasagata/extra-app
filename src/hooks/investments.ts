import { QueryFunctionContext, useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getFromApi, postToApi } from "../utils/fetching";
import { useAuthentication } from "./authentication";
import { useEffect } from "react";
import { Alert } from "react-native";
import SessionExpiredError from "../errors/SessionExpiredError";
import { useNavigation } from "@react-navigation/native";








// ***********************************
//
//  Fetch Queries
//
// ***********************************

function getInvestmentList({ queryKey }: QueryFunctionContext<[string, string[]?, Date?, Date?]>): Promise<InvestmentDTO[]> {
  return getFromApi("/getMyInvestments");
}

function submitInvestment(request: InvestmentAddingRequest): Promise<ApiResponse> {
  return postToApi("/addInvestment", {
    credentials: "include",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(request)
  });
};







// ***********************************
//
//  Custom Hooks
//
// ***********************************

export function useInvestmentList() {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({
    queryKey: ["getMyInvestments"],
    queryFn: getInvestmentList,
    retry: false
  });

  useEffect(() => {
    if(query.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        query.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(query.isError) {
      Alert.alert(
        "Error",
        query.error.message
      );
    }
  }, [query.error]);

  return query;
}

export function useInvestmentCreationForm() {
  const queryClient = useQueryClient();

  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({
    mutationFn: submitInvestment,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getMyInvestments'] })
    },
    retry: false
  });
  

  useEffect(() => {
    if(mutation.error instanceof SessionExpiredError){
      Alert.alert(
        "Session Expired", 
        mutation.error.message, 
        [{text: "Return to Login", onPress: sessionExpired}]
      );
  
    } else if(mutation.isError) {
      Alert.alert(
        "Error",
        mutation.error.message
      );
    }
  }, [mutation.error]);

  useEffect(() => {
    if(mutation.isSuccess){
      Alert.alert(
        "Creation Success",
        "Investment created successfully",
        [{
          text: "OK", 
          onPress: async () => {
            navigation.navigate("investment-list" as never);
            navigation.navigate("Table" as never);
          }
        }]
      );
    }
  }, [mutation.isSuccess]);

  return mutation;
}
