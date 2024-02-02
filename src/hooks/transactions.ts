import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFromApi, postToApi } from "../utils/fetching";
import { Alert } from "react-native";
import SessionExpiredError from "../errors/SessionExpiredError";
import { useAuthentication } from "./authentication";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";








// ***********************************
//
//  Fetch Queries
//
// ***********************************

function submitExpense(request: ExpenseCreationRequest): Promise<ApiResponse> {
  return postToApi("/addExpense", {
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(request)
  });
};

function deleteExpense(budgetId: string): Promise<ApiResponse> {
  return deleteFromApi(`/expenses/${budgetId}`);
};

function submitEditedExpense({budgetId, request}: {budgetId: string, request: ExpenseEditingRequest}): Promise<ApiResponse> {
  return postToApi(`/editExpense/${budgetId}`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });
};

function getTransactionList({ queryKey }: QueryFunctionContext<[string, string[]?, Date?, Date?]>): Promise<Expense[]> {
  const [, categories, from, until] = queryKey;
  // const comma_separated_categories = categories ? categories.map(c => c + ",") : "";
  const iso_from_date = from ? from : "";
  const iso_until_date = until ? until : "";

  // return getFromApi(`/getMyExpenses?categories=${comma_separated_categories}&from=${iso_from_date}&until=${iso_until_date}`);
  return postToApi("/getMyTransactions", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categories,
      from: iso_from_date,
      until: iso_until_date
    })
  });

}

function getSumOfExpenses({ queryKey }: QueryFunctionContext<[string, string[]?, Date?, Date?]>): Promise<{category: Category, amount: string}[]> {
  const [, categories, from, until] = queryKey;
  // const comma_separated_categories = categories ? categories.map(c => c + ",") : "";
  const iso_from_date = from ? from : "";
  const iso_until_date = until ? until : "";

  // return getFromApi(`/getSumOfExpenses?categories=${comma_separated_categories}&from=${iso_from_date}&until=${iso_until_date}`);
  return postToApi("/getSumOfExpenses", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categories,
      from: iso_from_date,
      until: iso_until_date
    })
  });
}

function getYearlySumOfTransactions({ queryKey }: QueryFunctionContext<[string, string[]?, Date?, Date?]>): Promise<{year: string, amount: string}[]> {
  const [, categories, from, until] = queryKey;
  const iso_from_date = from ? from : "";
  const iso_until_date = until ? until : "";

  return postToApi("/getYearlySumOfTransactions", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categories,
      from: iso_from_date,
      until: iso_until_date
    })
  });
}







// ***********************************
//
//  Custom Hooks
//
// ***********************************

export function useExpenseCreationForm() {
  const queryClient = useQueryClient();

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({ 
    mutationFn: submitExpense,
    onSuccess() {
      // Invalidate budget lists
      queryClient.invalidateQueries({ queryKey: ['getBudgets'] })
      queryClient.invalidateQueries({ queryKey: ['getActiveBudgets'] })
      // Invalidate expense lists and reports
      queryClient.invalidateQueries({ queryKey: ['getExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getSumOfExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getYearlySumOfTransactions'] })
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      queryClient.invalidateQueries({ queryKey: ['getAllCategoriesWithIcons'] })
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
        "Expense created successfully",
        [{
          text: "OK", 
          onPress: async () => {
            await delay(100);
            navigation.navigate("expense-add/categories-list" as never);
            navigation.navigate("Table" as never);
          }
        }]
      );
    }
  }, [mutation.isSuccess]);

  return mutation;
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({ 
    mutationFn: deleteExpense,
    onSuccess() {
      // Invalidate budget lists
      queryClient.invalidateQueries({ queryKey: ['getBudgets'] })
      queryClient.invalidateQueries({ queryKey: ['getActiveBudgets'] })
      // Invalidate expense lists and reports
      queryClient.invalidateQueries({ queryKey: ['getExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getSumOfExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getYearlySumOfExpenses'] })
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      queryClient.invalidateQueries({ queryKey: ['getAllCategoriesWithIcons'] })
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

  return mutation;
}

export function useEditExpenseForm() {
  const queryClient = useQueryClient();
  
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const navigation = useNavigation();
  const { sessionExpired } = useAuthentication();
  const mutation = useMutation({ 
    mutationFn: submitEditedExpense,
    onSuccess() {
      // Invalidate budget lists
      queryClient.invalidateQueries({ queryKey: ['getBudgets'] })
      queryClient.invalidateQueries({ queryKey: ['getActiveBudgets'] })
      // Invalidate expense lists and reports
      queryClient.invalidateQueries({ queryKey: ['getExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getSumOfExpenses'] })
      queryClient.invalidateQueries({ queryKey: ['getYearlySumOfExpenses'] })
      // Invalidate category lists
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      queryClient.invalidateQueries({ queryKey: ['getAllCategoriesWithIcons'] })
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
        "Expense Edit Success", 
        "Your Expense was edited successfully", 
        [{
          text: "OK", 
          onPress: async () => {
            await delay(100);
            navigation.navigate("expense-modify/categories-list" as never);
            navigation.navigate("Table" as never);
          }
        }]
      );
    }
  }, [mutation.isSuccess]);

  return mutation;
}

export function useTransactionList(request: { categories?: string[], from?: Date, until?: Date }) {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({ 
    queryKey: ['getExpenses', request?.categories, request?.from, request?.until], 
    queryFn: getTransactionList,
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

export function useSumOfExpenses(request: { categories?: string[], from?: Date, until?: Date }) {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({ 
    queryKey: ['getSumOfExpenses', request?.categories, request?.from, request?.until], 
    queryFn: getSumOfExpenses,
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


export function useYearlySumOfTransactions(request: { categories?: string[], from?: Date, until?: Date }) {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({ 
    queryKey: ['getYearlySumOfExpenses', request?.categories, request?.from, request?.until], 
    queryFn: getYearlySumOfTransactions,
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
