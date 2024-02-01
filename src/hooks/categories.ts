import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { getFromApi } from "../utils/fetching";
import { Alert } from "react-native";
import SessionExpiredError from "../errors/SessionExpiredError";
import { useAuthentication } from "./authentication";
import { useEffect } from "react";







// ***********************************
//
//  Fetch Queries
//
// ***********************************

function getUserCategories({ queryKey }: QueryFunctionContext<[string]>): Promise<Category[]> {
  return getFromApi("/getAllCategories").then(addDefaultCategoryNames);
}

function getUserCategoriesWithIcons({ queryKey }: QueryFunctionContext<[string]>): Promise<CategoryDTO[]> {
  return getFromApi("/getAllCategoriesWithIcons").then(addDefaultCategories);
}

enum Icon {
  AIRPLANE = 1,
  DRINK = 2,
  KEY = 3,
  SHOPPING_CART = 4,
  CLAPPERBOARD = 5,
  CROSS = 6,
  MAN = 7,
  BOOK = 8,
  DOLLAR = 9
}

const defaultCategories: CategoryDTO[] = [
  {name: "Travel", iconId: Icon.AIRPLANE},
  {name: "Education", iconId: Icon.BOOK},
  {name: "Entertainment", iconId: Icon.CLAPPERBOARD},
  {name: "Health", iconId: Icon.CROSS},
  {name: "Taxes", iconId: Icon.DOLLAR},
  {name: "Food", iconId: Icon.DRINK},
  {name: "Housing", iconId: Icon.KEY},
  {name: "Clothing", iconId: Icon.MAN},
  {name: "Shopping", iconId: Icon.SHOPPING_CART},
];

const defaultCategoryNames = defaultCategories.map(defCat => defCat.name);

function addDefaultCategories(categories?: CategoryDTO[]) {
  if (!categories) {
    return [...defaultCategories];
  }

  const missingCategories = defaultCategories.filter(defaultCategory => !categories.includes(defaultCategory));
  return [...categories, ...missingCategories];
}

function addDefaultCategoryNames(categoryNames: string[]) {
  if (!categoryNames) {
    return [...defaultCategoryNames];
  }

  const missingCategoryNames = defaultCategoryNames.filter(defaultCategoryName => !categoryNames.includes(defaultCategoryName));
  return [...categoryNames, ...missingCategoryNames];
}







// ***********************************
//
//  Custom Hooks
//
// ***********************************

export function useUserCategories() {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getUserCategories,
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

export function useUserCategoriesWithIcons() {
  const { sessionExpired } = useAuthentication();
  const query = useQuery({
    queryKey: ["getAllCategoriesWithIcons"],
    queryFn: getUserCategoriesWithIcons,
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
