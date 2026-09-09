/**
 * Ensures a valid 24-character hex MongoDB ObjectId for order creation
 * prevents BSONError Cast to ObjectId failed when using Google auth sub numeric IDs or guest sessions.
 */
export const getValidUserId = (userOrId) => {
  const id = typeof userOrId === 'object' ? userOrId?._id || userOrId?.id : userOrId;
  if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  return "6432b4b455b7782b79427329";
};

const COUNTRY_MAP = {
  "india": "IN",
  "in": "IN",
  "united states": "US",
  "united states (us)": "US",
  "usa": "US",
  "us": "US",
  "united kingdom": "GB",
  "uk": "GB",
  "great britain": "GB",
  "gb": "GB",
  "canada": "CA",
  "ca": "CA",
  "australia": "AU",
  "au": "AU",
  "germany": "DE",
  "de": "DE",
  "france": "FR",
  "fr": "FR",
  "united arab emirates": "AE",
  "uae": "AE",
  "ae": "AE",
  "singapore": "SG",
  "sg": "SG",
  "pakistan": "PK",
  "pk": "PK",
  "bangladesh": "BD",
  "bd": "BD",
  "netherlands": "NL",
  "nl": "NL",
  "spain": "ES",
  "es": "ES",
  "italy": "IT",
  "it": "IT",
  "japan": "JP",
  "jp": "JP",
  "china": "CN",
  "cn": "CN",
  "brazil": "BR",
  "br": "BR",
  "mexico": "MX",
  "mx": "MX",
  "south africa": "ZA",
  "za": "ZA",
  "russia": "RU",
  "ru": "RU",
  "new zealand": "NZ",
  "nz": "NZ",
  "switzerland": "CH",
  "ch": "CH",
  "sweden": "SE",
  "se": "SE",
  "norway": "NO",
  "no": "NO",
};

/**
 * Returns a valid 2-character ISO 3166-1 alpha-2 country code required by Stripe
 */
export const getCountryIsoCode = (countryStr) => {
  if (!countryStr || typeof countryStr !== 'string') return 'US';
  const clean = countryStr.trim().toLowerCase();
  if (COUNTRY_MAP[clean]) return COUNTRY_MAP[clean];
  if (clean.length === 2) return clean.toUpperCase();
  return 'US';
};
