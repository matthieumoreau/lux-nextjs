import gql from 'graphql-tag';
type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
};



type Query = {
   __typename?: 'Query';
  offer?: Maybe<Offer>;
};


type QueryOfferArgs = {
  id: Scalars['String'];
};

type Mutation = {
   __typename?: 'Mutation';
  sendMessage?: Maybe<Contact>;
};


type MutationSendMessageArgs = {
  input?: Maybe<ContactInput>;
};

type Offer = {
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

type Contact = {
   __typename?: 'Contact';
  copy?: Maybe<Scalars['JSONObject']>;
  message?: Maybe<Scalars['String']>;
  send?: Maybe<Scalars['JSONObject']>;
  success?: Maybe<Scalars['Boolean']>;
};

type ContactInput = {
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

type OfferAddress = {
   __typename?: 'OfferAddress';
  Locality0?: Maybe<Locality>;
  Locality1?: Maybe<Locality>;
  Locality2?: Maybe<Locality>;
};

type Agency = {
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

type Ddt = {
   __typename?: 'DDT';
  DPE?: Maybe<DdtData>;
  GES?: Maybe<DdtData>;
};

type Photo = {
   __typename?: 'Photo';
  Type?: Maybe<Scalars['String']>;
  Id?: Maybe<Scalars['String']>;
  Order?: Maybe<Scalars['Int']>;
  Url?: Maybe<Scalars['String']>;
};

type Price = {
   __typename?: 'Price';
  Raw?: Maybe<Scalars['Float']>;
  Currency?: Maybe<Scalars['String']>;
  Alur?: Maybe<Array<Maybe<Alur>>>;
};

type Properties = {
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

type PropertyType = {
   __typename?: 'PropertyType';
  Id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  trackingLabel?: Maybe<Scalars['String']>;
  translationKey?: Maybe<Scalars['String']>;
};

type TransactionType = {
   __typename?: 'TransactionType';
  Id: Scalars['Int'];
  label?: Maybe<Scalars['String']>;
  trackingLabel?: Maybe<Scalars['String']>;
  trackingId?: Maybe<Scalars['String']>;
  trackingLevel2?: Maybe<Scalars['String']>;
  translationKey?: Maybe<Scalars['String']>;
};

type Locality = {
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

type AgencyAddress = {
   __typename?: 'AgencyAddress';
  Street?: Maybe<Scalars['String']>;
  ZipCode?: Maybe<Scalars['String']>;
  Locality0?: Maybe<Locality>;
  Locality1?: Maybe<Locality>;
  Locality2?: Maybe<Locality>;
};

type DdtData = {
   __typename?: 'DDTData';
  Class?: Maybe<Scalars['String']>;
  Value?: Maybe<Scalars['Int']>;
};

type Alur = {
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

type Heating = {
   __typename?: 'Heating';
  Id: Scalars['Int'];
  translationKey?: Maybe<Scalars['String']>;
};


declare module '*/contact.mutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const contactOffer: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/offer.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const offer: DocumentNode;

  export default defaultDocument;
}
    

 const ContactOffer = gql`
    mutation contactOffer($input: ContactInput) {
  sendMessage(input: $input) {
    success
    message
    copy
    send
  }
}
    `;
 const Offer = gql`
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