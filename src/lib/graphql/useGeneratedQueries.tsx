import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
};



export type Query = {
   __typename?: 'Query';
  offer?: Maybe<Offer>;
};


export type QueryOfferArgs = {
  id: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  sendMessage?: Maybe<Contact>;
};


export type MutationSendMessageArgs = {
  input?: Maybe<ContactInput>;
};

export type Offer = {
   __typename?: 'Offer';
  AdId: Scalars['String'];
  AdRef: Scalars['String'];
  Address?: Maybe<OfferAddress>;
  Agency?: Maybe<Agency>;
  CommercialOffer?: Maybe<Scalars['Int']>;
  DDT?: Maybe<Ddt>;
  Description?: Maybe<Scalars['JSONObject']>;
  IsExclusive?: Maybe<Scalars['Boolean']>;
  Photos?: Maybe<Array<Maybe<Photo>>>;
  Price?: Maybe<Price>;
  Properties?: Maybe<Properties>;
  PropertyId?: Maybe<Scalars['Int']>;
  PropertyType?: Maybe<PropertyType>;
  PublicationId?: Maybe<Scalars['Int']>;
  TransactionType?: Maybe<TransactionType>;
};

export type Contact = {
   __typename?: 'Contact';
  copy?: Maybe<Scalars['JSONObject']>;
  message?: Maybe<Scalars['String']>;
  send?: Maybe<Scalars['JSONObject']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ContactInput = {
  lang?: Maybe<Scalars['String']>;
  offerId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  TransactionTypeId?: Maybe<Scalars['String']>;
};

export type OfferAddress = {
   __typename?: 'OfferAddress';
  Locality0?: Maybe<Locality>;
  Locality1?: Maybe<Locality>;
  Locality2?: Maybe<Locality>;
};

export type Agency = {
   __typename?: 'Agency';
  AgencyId: Scalars['String'];
  ThirdPartyId?: Maybe<Scalars['Int']>;
  Name?: Maybe<Scalars['String']>;
  Email?: Maybe<Scalars['String']>;
  Siren?: Maybe<Scalars['Int']>;
  Siret?: Maybe<Scalars['Int']>;
  WebSiteUrl?: Maybe<Scalars['String']>;
  PhoneNumber?: Maybe<Scalars['String']>;
  Logo?: Maybe<Scalars['String']>;
  PrestoId?: Maybe<Scalars['String']>;
  Address?: Maybe<AgencyAddress>;
};

export type Ddt = {
   __typename?: 'DDT';
  DPE?: Maybe<DdtData>;
  GES?: Maybe<DdtData>;
};

export type Photo = {
   __typename?: 'Photo';
  Type?: Maybe<Scalars['String']>;
  Id?: Maybe<Scalars['String']>;
  Order?: Maybe<Scalars['Int']>;
  Url?: Maybe<Scalars['String']>;
};

export type Price = {
   __typename?: 'Price';
  Raw?: Maybe<Scalars['Float']>;
  Currency?: Maybe<Scalars['String']>;
  Alur?: Maybe<Array<Maybe<Alur>>>;
};

export type Properties = {
   __typename?: 'Properties';
  BuildYear?: Maybe<Scalars['Int']>;
  Fees?: Maybe<Scalars['Float']>;
  Floor?: Maybe<Scalars['Int']>;
  HasAirConditioned?: Maybe<Scalars['Boolean']>;
  IsTiledFloor?: Maybe<Scalars['Float']>;
  HasAlarm?: Maybe<Scalars['Boolean']>;
  HasBasement?: Maybe<Scalars['Boolean']>;
  HasCableTv?: Maybe<Scalars['Boolean']>;
  HasCaretaker?: Maybe<Scalars['Boolean']>;
  HasCellar?: Maybe<Scalars['Boolean']>;
  HasChimney?: Maybe<Scalars['Boolean']>;
  HasCondominiumSyndicate?: Maybe<Scalars['Boolean']>;
  HasEntryCode?: Maybe<Scalars['Boolean']>;
  HasHandicapAccessibility?: Maybe<Scalars['Boolean']>;
  HasIntercom?: Maybe<Scalars['Boolean']>;
  HasLift?: Maybe<Scalars['Boolean']>;
  HasParquet?: Maybe<Scalars['Boolean']>;
  HasPool?: Maybe<Scalars['Boolean']>;
  HasSyndicatProcedure?: Maybe<Scalars['Boolean']>;
  IsHighlighed?: Maybe<Scalars['Boolean']>;
  IsBuildable?: Maybe<Scalars['Boolean']>;
  IsCalm?: Maybe<Scalars['Boolean']>;
  IsDuplex?: Maybe<Scalars['Boolean']>;
  IsFurnished?: Maybe<Scalars['Boolean']>;
  IsIsmh?: Maybe<Scalars['Boolean']>;
  IsRenovated?: Maybe<Scalars['Boolean']>;
  IsRecent?: Maybe<Scalars['Boolean']>;
  IsToRenovate?: Maybe<Scalars['Boolean']>;
  EnvironmentId?: Maybe<Scalars['Int']>;
  HeatingKind?: Maybe<Heating>;
  HeatingType?: Maybe<Heating>;
  KitchenTypeId?: Maybe<Scalars['Int']>;
  NbrBathRoom?: Maybe<Scalars['Int']>;
  NbrBedroom?: Maybe<Scalars['Int']>;
  NbrBoxes?: Maybe<Scalars['Int']>;
  NbrParking?: Maybe<Scalars['Int']>;
  NbrRoom?: Maybe<Scalars['Int']>;
  NbrShowerRoom?: Maybe<Scalars['Int']>;
  NbrToilets?: Maybe<Scalars['Int']>;
  NbrTennisFields?: Maybe<Scalars['Int']>;
  Area?: Maybe<Scalars['Float']>;
  PlotArea?: Maybe<Scalars['Float']>;
  LivingRoomArea?: Maybe<Scalars['Float']>;
  LivingArea?: Maybe<Scalars['Float']>;
  SyndicatProcedureDescription?: Maybe<Scalars['String']>;
  HasTennisField?: Maybe<Scalars['Boolean']>;
  IsSunny?: Maybe<Scalars['Boolean']>;
  Exposure?: Maybe<Scalars['String']>;
  IsHighlighted?: Maybe<Scalars['Boolean']>;
  TypeYatch?: Maybe<Scalars['String']>;
  NbrPassengers?: Maybe<Scalars['Int']>;
  Size?: Maybe<Scalars['Float']>;
};

export type PropertyType = {
   __typename?: 'PropertyType';
  Id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  trackingLabel?: Maybe<Scalars['String']>;
  translationKey?: Maybe<Scalars['String']>;
};

export type TransactionType = {
   __typename?: 'TransactionType';
  Id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  trackingLabel?: Maybe<Scalars['String']>;
  trackingId?: Maybe<Scalars['String']>;
  trackingLevel2?: Maybe<Scalars['String']>;
  translationKey?: Maybe<Scalars['String']>;
};

export type Locality = {
   __typename?: 'Locality';
  id: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  names?: Maybe<Scalars['JSONObject']>;
  zip?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  country?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  lgnid?: Maybe<Scalars['Int']>;
  lgcid?: Maybe<Scalars['Int']>;
};

export type AgencyAddress = {
   __typename?: 'AgencyAddress';
  Street?: Maybe<Scalars['String']>;
  ZipCode?: Maybe<Scalars['String']>;
  Locality0?: Maybe<Locality>;
  Locality1?: Maybe<Locality>;
  Locality2?: Maybe<Locality>;
};

export type DdtData = {
   __typename?: 'DDTData';
  Class?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['Int']>;
};

export type Alur = {
   __typename?: 'Alur';
  AdditionalRent?: Maybe<Scalars['Float']>;
  AgencyRentFees?: Maybe<Scalars['Int']>;
  HasLisPendens?: Maybe<Scalars['Boolean']>;
  AnnualCosts?: Maybe<Scalars['Float']>;
  Charge?: Maybe<Scalars['Float']>;
  ChargesRegulFrequency?: Maybe<Scalars['Float']>;
  DueDateCharges?: Maybe<Scalars['Float']>;
  DueDateRent?: Maybe<Scalars['Float']>;
  FeedInventoryFixtures?: Maybe<Scalars['Float']>;
  FlagValuesFees?: Maybe<Scalars['Float']>;
  FrequencyCharges?: Maybe<Scalars['Float']>;
  FrequencyRent?: Maybe<Scalars['Float']>;
  GuarantieDeposit?: Maybe<Scalars['Float']>;
  HasSupplementPrice?: Maybe<Scalars['Float']>;
  SupplementPrice?: Maybe<Scalars['Float']>;
  IdTypesFeesRental?: Maybe<Scalars['Float']>;
  IdTypesFeesSale?: Maybe<Scalars['Float']>;
  LotNumber?: Maybe<Scalars['Float']>;
  NumberLots?: Maybe<Scalars['Float']>;
  PercentFees?: Maybe<Scalars['Float']>;
  PercentFeesNetSeller?: Maybe<Scalars['Float']>;
  PriceExludingFeesBorneByBuyer?: Maybe<Scalars['Float']>;
  ValuesFees?: Maybe<Scalars['Float']>;
  TxtProcedure?: Maybe<Scalars['String']>;
};

export type Heating = {
   __typename?: 'Heating';
  Id: Scalars['Int'];
  translationKey?: Maybe<Scalars['String']>;
};

export type ContactOfferMutationVariables = {
  input?: Maybe<ContactInput>;
};


export type ContactOfferMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage?: Maybe<(
    { __typename?: 'Contact' }
    & Pick<Contact, 'success' | 'message' | 'copy' | 'send'>
  )> }
);

export type OfferQueryVariables = {
  id: Scalars['String'];
};


export type OfferQuery = (
  { __typename?: 'Query' }
  & { offer?: Maybe<(
    { __typename?: 'Offer' }
    & { offerId: Offer['AdId'], refId: Offer['AdRef'], description: Offer['Description'] }
    & { propertyType?: Maybe<(
      { __typename?: 'PropertyType' }
      & Pick<PropertyType, 'label' | 'trackingLabel' | 'translationKey'>
      & { id: PropertyType['Id'] }
    )>, transactionType?: Maybe<(
      { __typename?: 'TransactionType' }
      & Pick<TransactionType, 'label' | 'trackingLabel' | 'trackingId' | 'trackingLevel2' | 'translationKey'>
      & { id: TransactionType['Id'] }
    )>, locality?: Maybe<(
      { __typename?: 'OfferAddress' }
      & { locality0?: Maybe<(
        { __typename?: 'Locality' }
        & Pick<Locality, 'name' | 'names' | 'country'>
      )>, locality1?: Maybe<(
        { __typename?: 'Locality' }
        & Pick<Locality, 'name' | 'names'>
      )>, locality2?: Maybe<(
        { __typename?: 'Locality' }
        & Pick<Locality, 'name' | 'names' | 'zip'>
      )> }
    )>, photos?: Maybe<Array<Maybe<(
      { __typename?: 'Photo' }
      & { order: Photo['Order'], type: Photo['Type'], url: Photo['Url'] }
    )>>>, price?: Maybe<(
      { __typename?: 'Price' }
      & { raw: Price['Raw'], currency: Price['Currency'] }
    )>, properties?: Maybe<(
      { __typename?: 'Properties' }
      & { buildYear: Properties['BuildYear'], fees: Properties['Fees'], floor: Properties['Floor'], hasAirConditioned: Properties['HasAirConditioned'], isTiledFloor: Properties['IsTiledFloor'], hasAlarm: Properties['HasAlarm'], hasBasement: Properties['HasBasement'], hasCableTv: Properties['HasCableTv'], hasCaretaker: Properties['HasCaretaker'], hasCellar: Properties['HasCellar'], hasChimney: Properties['HasChimney'], hasCondominiumSyndicate: Properties['HasCondominiumSyndicate'], hasEntryCode: Properties['HasEntryCode'], hasHandicapAccessibility: Properties['HasHandicapAccessibility'], hasIntercom: Properties['HasIntercom'], hasLift: Properties['HasLift'], hasParquet: Properties['HasParquet'], hasPool: Properties['HasPool'], hasSyndicatProcedure: Properties['HasSyndicatProcedure'], isHighlighed: Properties['IsHighlighed'], isBuildable: Properties['IsBuildable'], isCalm: Properties['IsCalm'], isDuplex: Properties['IsDuplex'], isFurnished: Properties['IsFurnished'], isIsmh: Properties['IsIsmh'], isRenovated: Properties['IsRenovated'], isRecent: Properties['IsRecent'], isToRenovate: Properties['IsToRenovate'], environmentId: Properties['EnvironmentId'], kitchenTypeId: Properties['KitchenTypeId'], nbrBathRoom: Properties['NbrBathRoom'], nbrBedroom: Properties['NbrBedroom'], nbrBoxes: Properties['NbrBoxes'], nbrParking: Properties['NbrParking'], nbrRoom: Properties['NbrRoom'], nbrShowerRoom: Properties['NbrShowerRoom'], nbrToilets: Properties['NbrToilets'], nbrTennisFields: Properties['NbrTennisFields'], area: Properties['Area'], plotArea: Properties['PlotArea'], livingRoomArea: Properties['LivingRoomArea'], livingArea: Properties['LivingArea'], syndicatProcedureDescription: Properties['SyndicatProcedureDescription'], hasTennisField: Properties['HasTennisField'], isSunny: Properties['IsSunny'], exposure: Properties['Exposure'], isHighlighted: Properties['IsHighlighted'], typeYatch: Properties['TypeYatch'], nbrPassengers: Properties['NbrPassengers'], size: Properties['Size'] }
      & { heatingKind?: Maybe<(
        { __typename?: 'Heating' }
        & Pick<Heating, 'translationKey'>
        & { id: Heating['Id'] }
      )>, heatingType?: Maybe<(
        { __typename?: 'Heating' }
        & Pick<Heating, 'translationKey'>
        & { id: Heating['Id'] }
      )> }
    )> }
  )> }
);


export const ContactOfferDocument = gql`
    mutation contactOffer($input: ContactInput) {
  sendMessage(input: $input) {
    success
    message
    copy
    send
  }
}
    `;
export type ContactOfferMutationFn = ApolloReactCommon.MutationFunction<ContactOfferMutation, ContactOfferMutationVariables>;

/**
 * __useContactOfferMutation__
 *
 * To run a mutation, you first call `useContactOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactOfferMutation, { data, loading, error }] = useContactOfferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactOfferMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ContactOfferMutation, ContactOfferMutationVariables>) {
        return ApolloReactHooks.useMutation<ContactOfferMutation, ContactOfferMutationVariables>(ContactOfferDocument, baseOptions);
      }
export type ContactOfferMutationHookResult = ReturnType<typeof useContactOfferMutation>;
export type ContactOfferMutationResult = ApolloReactCommon.MutationResult<ContactOfferMutation>;
export type ContactOfferMutationOptions = ApolloReactCommon.BaseMutationOptions<ContactOfferMutation, ContactOfferMutationVariables>;
export const OfferDocument = gql`
    query offer($id: String!) {
  offer(id: $id) {
    offerId: AdId
    refId: AdRef
    propertyType: PropertyType {
      id: Id
      label
      trackingLabel
      translationKey
    }
    transactionType: TransactionType {
      id: Id
      label
      trackingLabel
      trackingId
      trackingLevel2
      translationKey
    }
    description: Description
    locality: Address {
      locality0: Locality0 {
        name
        names
        country
      }
      locality1: Locality1 {
        name
        names
      }
      locality2: Locality2 {
        name
        names
        zip
      }
    }
    photos: Photos {
      order: Order
      type: Type
      url: Url
    }
    price: Price {
      raw: Raw
      currency: Currency
    }
    properties: Properties {
      buildYear: BuildYear
      fees: Fees
      floor: Floor
      hasAirConditioned: HasAirConditioned
      isTiledFloor: IsTiledFloor
      hasAlarm: HasAlarm
      hasBasement: HasBasement
      hasCableTv: HasCableTv
      hasCaretaker: HasCaretaker
      hasCellar: HasCellar
      hasChimney: HasChimney
      hasCondominiumSyndicate: HasCondominiumSyndicate
      hasEntryCode: HasEntryCode
      hasHandicapAccessibility: HasHandicapAccessibility
      hasIntercom: HasIntercom
      hasLift: HasLift
      hasParquet: HasParquet
      hasPool: HasPool
      hasSyndicatProcedure: HasSyndicatProcedure
      isHighlighed: IsHighlighed
      isBuildable: IsBuildable
      isCalm: IsCalm
      isDuplex: IsDuplex
      isFurnished: IsFurnished
      isIsmh: IsIsmh
      isRenovated: IsRenovated
      isRecent: IsRecent
      isToRenovate: IsToRenovate
      environmentId: EnvironmentId
      heatingKind: HeatingKind {
        id: Id
        translationKey
      }
      heatingType: HeatingType {
        id: Id
        translationKey
      }
      kitchenTypeId: KitchenTypeId
      nbrBathRoom: NbrBathRoom
      nbrBedroom: NbrBedroom
      nbrBoxes: NbrBoxes
      nbrParking: NbrParking
      nbrRoom: NbrRoom
      nbrShowerRoom: NbrShowerRoom
      nbrToilets: NbrToilets
      nbrTennisFields: NbrTennisFields
      area: Area
      plotArea: PlotArea
      livingRoomArea: LivingRoomArea
      livingArea: LivingArea
      syndicatProcedureDescription: SyndicatProcedureDescription
      hasTennisField: HasTennisField
      isSunny: IsSunny
      exposure: Exposure
      isHighlighted: IsHighlighted
      typeYatch: TypeYatch
      nbrPassengers: NbrPassengers
      size: Size
    }
  }
}
    `;

/**
 * __useOfferQuery__
 *
 * To run a query within a React component, call `useOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfferQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfferQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OfferQuery, OfferQueryVariables>) {
        return ApolloReactHooks.useQuery<OfferQuery, OfferQueryVariables>(OfferDocument, baseOptions);
      }
export function useOfferLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OfferQuery, OfferQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OfferQuery, OfferQueryVariables>(OfferDocument, baseOptions);
        }
export type OfferQueryHookResult = ReturnType<typeof useOfferQuery>;
export type OfferLazyQueryHookResult = ReturnType<typeof useOfferLazyQuery>;
export type OfferQueryResult = ApolloReactCommon.QueryResult<OfferQuery, OfferQueryVariables>;