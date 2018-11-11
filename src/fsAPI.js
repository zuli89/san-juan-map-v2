
export function searchVenues() {
  const Client_ID = "0NC4AMLUJW5AN3MVOYHFEFRT2GJY5U3N4DDCKDIV2SLTQIPE";
  const Client_Secret = "AJBAKVDW52PT1XEH1LPSD4WZOLSG25NDCUA4FWGHZPQ1PNAP";
  const ll = "18.466080,-66.115531";
  const radius= "450";
  //I selected a number of category IDs to have more control on what was requested
  const categoryId= "4bf58dd8d48988d144941735,4bf58dd8d48988d1be941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11e941735,4bf58dd8d48988d1e0931735";
  const limit= 18; 
  const apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${Client_ID}&client_secret=${Client_Secret}&v=20181031&ll=` 
  +ll + '&radius=' + radius + '&categoryId=' + categoryId + '&limit=' + limit ;
  return fetch(apiURL).then(resp => resp.json())
}

export function getVenueInfo(VENUE_ID) {
  const Client_ID = "0NC4AMLUJW5AN3MVOYHFEFRT2GJY5U3N4DDCKDIV2SLTQIPE";
  const Client_Secret = "AJBAKVDW52PT1XEH1LPSD4WZOLSG25NDCUA4FWGHZPQ1PNAP";
  const apiURL = `https://api.foursquare.com/v2/venues/${VENUE_ID}?client_id=${Client_ID}&client_secret=${Client_Secret}&v=20181031` 
  return fetch(apiURL).then(resp => resp.json())
}

