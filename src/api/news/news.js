export const getNewsFromApi = async ({ data }) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=pets&from=${data}&sortBy=publishedAt&apiKey=45e830cb9466478c9f0eb55b6682d0a0`)
  return response.json()
};