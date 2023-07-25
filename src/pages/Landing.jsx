import { useLoaderData } from 'react-router-dom'

import axios from 'axios'
import CocktailList from '../Components/CocktailList'
import SearchBar from '../Components/SearchBar'

import { useCallback, useEffect, useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
const cocktailsSearchUrl = `https://thecocktaildb.com/api/json/v1/1/search.php?s=`

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailsSearchUrl}${searchTerm}`)
      return response.data.drinks
    },
  }
}
export const loader = (queryClinet ) => async ({ request }) => {
  const requestData = request.url.split('=')[1]


  // console.log(requestData)

  // console.log(request)
  const searchTerm = requestData ? requestData : ''

  await queryClinet.ensureQueryData(searchCocktailsQuery(searchTerm))

  return { searchTerm }
}
const Landing = () => {
  const { searchTerm } = useLoaderData()
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm))

  return (
    <>
      <SearchBar searchItem={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  )
}
export default Landing
