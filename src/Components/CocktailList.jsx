import Wrapper from '../assets/wrappers/CocktailList'
import CocktailCard from './CocktailCard'
const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return <h4 style={{ textAlign: 'center' }}> NO matching cocktail...</h4>
  }

  const formatedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } = drink
    
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    }
  })
  return (
    <Wrapper>
      {formatedDrinks.map((item) => {
        const { id } = item
        return <CocktailCard key={id} item={item}></CocktailCard>
      })}
    </Wrapper>
  )
}
export default CocktailList
