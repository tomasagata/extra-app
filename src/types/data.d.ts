






// ***********************************
//
//  Expense
//
// ***********************************

declare interface Expense {
  id: string,
  userId: string,
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};

declare interface ExpenseCreationRequest {
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};

declare interface ExpenseEditingRequest {
  concept: string,
  amount: string,
  date: string,
  category: string,
  iconId: string
};







// ***********************************
//
//  Budgets
//
// ***********************************

declare interface Budget {
  id: string,
  name: string, 
  limitAmount: string,
  currentAmount: string,
  creationDate: string,
  limitDate: string,
  category: string,
  iconId: string
};

declare interface BudgetCreationRequest {
  name: string, 
  limitAmount: string,
  currentAmount: string,
  creationDate: string,
  limitDate: string,
  category: string,
  iconId: string
};







// ***********************************
//
//  Investments
//
// ***********************************

declare interface InvestmentDTO {
  id: string,
  name: string, 
  downPaymentAmount: string;
  downPaymentTimestamp: string;
  depositAmount: string;
  maxNumberOfDeposits: number;
  depositIntervalInDays: number;
  category: CategoryDTO;
};

declare interface InvestmentAddingRequest {
  name: string, 
  downPaymentAmount: string;
  downPaymentTimestamp: string;
  depositAmount: string;
  maxNumberOfDeposits: number;
  depositIntervalInDays: number;
  category: string;
  iconId: string;
};







// ***********************************
//
//  Authentication
//
// ***********************************

declare interface UserRegistrationRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat: string
};

declare interface UserChangePasswordRequest {
  currentPassword: string,
  newPassword: string,
  newPasswordRepeat: string
};

declare interface PasswordResetRequest {
  token: string,
  newPassword: string,
  newPasswordRepeat: string
};







// ***********************************
//
//  Categories
//
// ***********************************

declare type Category = string;
declare interface CategoryDTO {
  name: Category,
  iconId: Icon
};

declare enum Icon {
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

declare function iconFactory(iconId: Icon) {
  switch (id) {
    case 1:
      return "aircraft"
    case 2:
      return "drink"
    case 3:
      return "key"
    case 4:
      return "shopping-cart"
    case 5:
      return "clapperboard"
    case 6:
      return "squared-plus"
    case 7:
      return "man"
    case 8:
      return "open-book"
    default:
      return "credit"
  }
};







// ***********************************
//
//  API Responses
//
// ***********************************

declare interface ApiResponse<T = any> {
  message: string,
  response: T
};

declare interface ApiError {
  status: HttpStatusCode,
  message: string,
  errors: string[]
};
