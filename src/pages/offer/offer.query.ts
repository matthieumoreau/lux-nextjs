import gql from 'graphql-tag';

const OFFER_QUERY = gql`
  query offer ($id: String!) {
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

export default OFFER_QUERY;
