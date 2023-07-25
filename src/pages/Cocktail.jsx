import { useLoaderData, Link, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Wrapper from '../assets/wrappers/CocktailPage'
const singleCocktailUrl = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=`
const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`)
      console.log(data)
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id.substring(1)

    await queryClient.ensureQueryData(singleCocktailQuery(id))

    return { id }
  }

const Cocktail = () => {
  const { id } = useLoaderData()

  const { data } = useQuery(singleCocktailQuery(id))
  console.log(data)
  if (!data) {
    return <Navigate to="/" />
  }
  const singleDrink = data.drinks[0]

  const ingredientProperties = Object.keys(singleDrink).filter((prop) =>
    prop.startsWith('strIngredient')
  )
  const ingredientValues = ingredientProperties.map((prop) => singleDrink[prop])
  const ingredients = ingredientValues.filter(
    (ingredient) => ingredient !== null
  )
  console.log(ingredients)

  const {
    strAlcoholic: info,
    strDrink: name,
    strCategory: category,
    strGlass: glass,
    strDrinkThumb: image,
    strInstructions: instructions,
  } = singleDrink
  console.log(singleDrink)

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
        <h2>{name}</h2>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.join(', ')}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
export default Cocktail
