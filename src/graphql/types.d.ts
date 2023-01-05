type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  JSON: any;
};

type BasicResponse = {
  __typename?: "BasicResponse";
  message: Maybe<Scalars["String"]>;
  status: Maybe<Scalars["String"]>;
};

type Broker = {
  __typename?: "Broker";
  agency: Maybe<Scalars["String"]>;
  name: Maybe<Scalars["String"]>;
  phone: Maybe<Scalars["String"]>;
};

type ListingFilter = {
  __typename?: "ListingFilter";
  defaultValue: Maybe<ListingFilterOption>;
  key: Maybe<Scalars["String"]>;
  options: Maybe<Array<Maybe<ListingFilterOption>>>;
};

type ListingFilterMatch = {
  __typename?: "ListingFilterMatch";
  key: Maybe<Scalars["String"]>;
  value: Maybe<Scalars["String"]>;
};

type ListingFilterOption = {
  __typename?: "ListingFilterOption";
  match: Maybe<ListingFilterMatch>;
  name: Maybe<Scalars["String"]>;
  value: Maybe<Scalars["String"]>;
};

type Mutation = {
  __typename?: "Mutation";
  /** Contact broker */
  contactBroker: Maybe<BasicResponse>;
  /** forget password */
  forgetPassword: Maybe<User>;
  /** Logoff */
  logoff: Maybe<User>;
  /** register a new user */
  register: Maybe<User>;
  /** reset password for forget password request */
  resetForgetPassword: Maybe<User>;
  /** Update (add or remove) listing for user */
  updateFavoriteListings: Maybe<User>;
};

type MutationContactBrokerArgs = {
  company: InputMaybe<Scalars["String"]>;
  email: InputMaybe<Scalars["String"]>;
  firstName: InputMaybe<Scalars["String"]>;
  lastName: InputMaybe<Scalars["String"]>;
  listingId: InputMaybe<Scalars["String"]>;
  message: InputMaybe<Scalars["String"]>;
  phone: InputMaybe<Scalars["String"]>;
};

type MutationForgetPasswordArgs = {
  email: InputMaybe<Scalars["String"]>;
};

type MutationLogoffArgs = {
  email: InputMaybe<Scalars["String"]>;
};

type MutationRegisterArgs = {
  email: InputMaybe<Scalars["String"]>;
  firstName: InputMaybe<Scalars["String"]>;
  lastName: InputMaybe<Scalars["String"]>;
  organization: InputMaybe<Scalars["String"]>;
  password: InputMaybe<Scalars["String"]>;
  phoneNumber: InputMaybe<Scalars["String"]>;
  userType: InputMaybe<Scalars["String"]>;
};

type MutationResetForgetPasswordArgs = {
  password: InputMaybe<Scalars["String"]>;
  resetToken: InputMaybe<Scalars["String"]>;
};

type MutationUpdateFavoriteListingsArgs = {
  listingId: InputMaybe<Scalars["String"]>;
  toLike: InputMaybe<Scalars["Boolean"]>;
};

/** All User and Listing apis available */
type Queries = {
  __typename?: "Queries";
  /** Get user info */
  getUserUserInfo: Maybe<User>;
  /** Login */
  login: Maybe<User>;
  /** Returns available filters for listings */
  queryListingFilters: Maybe<Array<Maybe<ListingFilter>>>;
  /** Returns listings that match the query param(s) */
  queryListings: Maybe<QueryListing>;
  /** Returns listings that match the query param(s) */
  queryListingsByIDs: Maybe<QueryListings>;
};

/** All User and Listing apis available */
type QueriesLoginArgs = {
  email: InputMaybe<Scalars["String"]>;
  password: InputMaybe<Scalars["String"]>;
};

/** All User and Listing apis available */
type QueriesQueryListingsArgs = {
  bounds: InputMaybe<QueryListingBounds>;
  currentPage: InputMaybe<Scalars["Int"]>;
  listingType: InputMaybe<Scalars["String"]>;
  rowsPerPage: InputMaybe<Scalars["Int"]>;
  spaceUse: InputMaybe<Scalars["String"]>;
};

/** All User and Listing apis available */
type QueriesQueryListingsByIDsArgs = {
  listingIDs: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

type QueryListing = {
  __typename?: "QueryListing";
  currentPage: Maybe<Scalars["Int"]>;
  listings: Maybe<Array<Maybe<SingleListing>>>;
  rowsPerPage: Maybe<Scalars["Int"]>;
  totalPage: Maybe<Scalars["Int"]>;
};

type QueryListingBounds = {
  east: InputMaybe<Scalars["Float"]>;
  north: InputMaybe<Scalars["Float"]>;
  south: InputMaybe<Scalars["Float"]>;
  west: InputMaybe<Scalars["Float"]>;
};

type QueryListings = {
  __typename?: "QueryListings";
  listings: Maybe<Array<Maybe<SingleListing>>>;
};

type SingleListing = {
  __typename?: "SingleListing";
  address: Maybe<Scalars["String"]>;
  availableSpaces: Maybe<Array<Maybe<Scalars["String"]>>>;
  brokersInfo: Maybe<Array<Maybe<Broker>>>;
  frequency: Maybe<Scalars["Float"]>;
  isPublic: Maybe<Scalars["Boolean"]>;
  latitude: Maybe<Scalars["String"]>;
  listingId: Maybe<Scalars["String"]>;
  longitude: Maybe<Scalars["String"]>;
  mediumIncome: Maybe<Scalars["String"]>;
  paid: Maybe<Scalars["Boolean"]>;
  polyGeom: Maybe<Scalars["JSON"]>;
  stats: Maybe<Scalars["JSON"]>;
  totalVisits: Maybe<Scalars["BigInt"]>;
  visitors: Maybe<Scalars["BigInt"]>;
};

type User = {
  __typename?: "User";
  authToken: Maybe<Scalars["String"]>;
  email: Maybe<Scalars["String"]>;
  favorite: Maybe<Array<Maybe<Scalars["String"]>>>;
  firstName: Maybe<Scalars["String"]>;
  isLoggedIn: Maybe<Scalars["String"]>;
  lastName: Maybe<Scalars["String"]>;
  organization: Maybe<Scalars["String"]>;
  phoneNumber: Maybe<Scalars["String"]>;
  userId: Maybe<Scalars["String"]>;
  userType: Maybe<Scalars["String"]>;
};
