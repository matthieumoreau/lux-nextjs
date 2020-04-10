import gql from 'graphql-tag';

const OFFER_QUERY = gql`
  query($id: String!) {
    offer(id: $id) {
      offerId: AdId
      refId: AdRef
      propertyTypeId: PropertyId
      transactionTypeId: TransactionTypeId
      description: Description
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
        heatingKindId: HeatingKindId
        heatingTypeId: HeatingTypeId
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
