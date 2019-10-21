export default async function({ axiosModule }) {
  await axiosModule.$get('/gf-api/gf-requests/')
}
