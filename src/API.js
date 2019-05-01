
const api = "/api"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (itineraryId) =>
  fetch(`${api}/${itineraryId}.json`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAll = () =>
  fetch(`${api}/my_itineraries.json`, { headers })
    .then(res => res.json())
    .then(data => data.my_itineraries)
