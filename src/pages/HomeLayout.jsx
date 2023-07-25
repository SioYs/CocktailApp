import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const HomeLayout = () => {
  const navigation = useNavigation()

  const isPageLoading = navigation.state === 'loading'
  const testData = 'test data for the context'
  return (
    <>
      <Navbar></Navbar>
      <div className="page">
        {isPageLoading ? (
          <div className="loading"></div>
        ) : (
          <Outlet context={{ testData }} />
        )}
      </div>
    </>
  )
}
export default HomeLayout
