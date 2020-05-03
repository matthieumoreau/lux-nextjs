export const getAgencyLogo = agency => {
  const agencyId = agency.AgencyId;
  const logoId = agency.Logo;
  const agcDirectory = agencyId !== undefined ? agencyId.substr(0, 3) : 'undef';
  agency.Logo =
    logoId !== null
      ? `${process.env.MMF_API_HOST}/agc/${agcDirectory}/${agencyId}/logo/160x110/${logoId}`.toLowerCase()
      : null;
  return agency;
};

export const getAgencySiren = agency => {
  return agency.Siren ? agency.Siren.substr(0, 9) : agency.Siren;
};
