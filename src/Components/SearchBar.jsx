import { Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/SearchForm'

const SearchBar = ({ searchItem }) => {
  return (
    <Wrapper>
      <Form className="form">
        <input type="search" name="search" className="form-input" />
        <button className="btn">Search</button>
      </Form>
    </Wrapper>
  )
}
export default SearchBar
