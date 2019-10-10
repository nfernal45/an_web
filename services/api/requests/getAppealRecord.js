export default async function(id) {
  $axios.$get(`/gf-api/gf-requests/${id}`)
}