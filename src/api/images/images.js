export const getImagesByApi = async () => {
  const response = await fetch("https://pixabay.com/api/?key=49555039-1678476e00af9cfd887436b5f&q=nature&image_type=photo&page=1&per_page=10")
  return response.json()
};