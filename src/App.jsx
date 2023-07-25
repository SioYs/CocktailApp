import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loader as landingLoader } from './pages/Landing'
import { loader as singleCocktailLoader } from './pages/Cocktail'
import { action as newsLetterAction } from './pages/Newsletter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from './pages/index'

const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100 * 5,
    },
  },
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: 'about',
        element: <About></About>,
        children: [
          {
            path: 'company',
            element: <h2>some company</h2>,
          },
          {
            path: 'person',
            element: <h4>Jhon</h4>,
          },
        ],
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryCLient),
        element: <Cocktail></Cocktail>,
      },
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryCLient),
      },
      {
        path: 'error',
        element: <Error></Error>,
      },
      {
        path: 'newsletter',
        element: <Newsletter></Newsletter>,
        action: newsLetterAction,
      },
    ],
  },
])
const App = () => {
  return (
    <QueryClientProvider client={queryCLient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  )
}
export default App
