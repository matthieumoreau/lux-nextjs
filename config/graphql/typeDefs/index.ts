import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Alur {
    AdditionalRent: Float
    AgencyRentFees: Int
    HasLisPendens: Boolean
    AnnualCosts: Float
    Charge: Float
    ChargesRegulFrequency: Float
    DueDateCharges: Float
    DueDateRent: Float
    FeedInventoryFixtures: Float
    FlagValuesFees: Float
    FrequencyCharges: Float
    FrequencyRent: Float
    GuarantieDeposit: Float
    HasSupplementPrice: Float
    SupplementPrice: Float
    IdTypesFeesRental: Float
    IdTypesFeesSale: Float
    LotNumber: Float
    NumberLots: Float
    PercentFees: Float
    PercentFeesNetSeller: Float
    PriceExludingFeesBorneByBuyer: Float
    ValuesFees: Float
    TxtProcedure: String
  }

  type Price {
    Raw: Float
    Currency: String
    Alur: [Alur]
  }

  type Photo {
    Type: String
    Id: String
    Order: Int
    Url: String
  }

  type PropertyType {
    Id: Int!
    label: String
    trackingLabel: String
    translationKey: String
  }

  type TransactionType {
    Id: Int!
    label: String
    trackingLabel: String
    trackingId: String
    trackingLevel2: String
    translationKey: String
  }

  type Offer {
    AdId: String!
    AdRef: String!
    IsExclusive: Boolean

    PropertyType: PropertyType
    TransactionType: TransactionType

    PropertyId: Int
    Properties: Properties
    Photos: [Photo]
    Description: JSONObject
    Price: Price
    Address: OfferAddress
    Agency: Agency
    PublicationId: Int
    DDT: DDT
    CommercialOffer: Int
  }

  type Heating {
    Id: Int!
    translationKey: String
  }

  type Properties {
    BuildYear: Int
    Fees: Float
    Floor: Int
    HasAirConditioned: Boolean
    IsTiledFloor: Float
    HasAlarm: Boolean
    HasBasement: Boolean
    HasCableTv: Boolean
    HasCaretaker: Boolean
    HasCellar: Boolean
    HasChimney: Boolean
    HasCondominiumSyndicate: Boolean
    HasEntryCode: Boolean
    HasHandicapAccessibility: Boolean
    HasIntercom: Boolean
    HasLift: Boolean
    HasParquet: Boolean
    HasPool: Boolean
    HasSyndicatProcedure: Boolean
    IsHighlighed: Boolean
    IsBuildable: Boolean
    IsCalm: Boolean
    IsDuplex: Boolean
    IsFurnished: Boolean
    IsIsmh: Boolean
    IsRenovated: Boolean
    IsRecent: Boolean
    IsToRenovate: Boolean
    EnvironmentId: Int
    HeatingKind: Heating
    HeatingType: Heating
    KitchenTypeId: Int
    NbrBathRoom: Int
    NbrBedroom: Int
    NbrBoxes: Int
    NbrParking: Int
    NbrRoom: Int
    NbrShowerRoom: Int
    NbrToilets: Int
    NbrTennisFields: Int
    Area: Float
    PlotArea: Float
    LivingRoomArea: Float
    LivingArea: Float
    SyndicatProcedureDescription: String
    HasTennisField: Boolean
    IsSunny: Boolean
    Exposure: String
    IsHighlighted: Boolean
    TypeYatch: String
    NbrPassengers: Int
    Size: Float
  }

  type DDT {
    DPE: DDTData
    GES: DDTData
  }

  type DDTData {
    Class: String
    Value: Int
  }

  type Agency {
    AgencyId: String!
    ThirdPartyId: Int
    Name: String
    Email: String
    Siren: Int
    Siret: Int
    WebSiteUrl: String
    PhoneNumber: String
    Logo: String
    PrestoId: String
    Address: AgencyAddress
  }

  type AgencyAddress {
    Street: String
    ZipCode: String
    Locality0: Locality
    Locality1: Locality
    Locality2: Locality
  }

  type OfferAddress {
    Locality0: Locality
    Locality1: Locality
    Locality2: Locality
  }

  type Locality {
    id: String!
    parentId: Int
    level: Int
    name: String
    zip: Int
    latitude: Float
    longitude: Float
    country: String
    language: String
    lgnid: Int
    lgcid: Int
  }

  type Query {
    offer(id: String!): Offer
  }
`;

export default typeDefs;
