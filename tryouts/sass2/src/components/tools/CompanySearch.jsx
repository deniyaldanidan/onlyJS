import React from 'react'
import { country_list, funding_list, industry_list } from '../../data/options';
import SearchBox from './SearchBox';


const CompanySearch = () => {
  return (
    <SearchBox list1={country_list} list2={industry_list} list3={funding_list} />
  )
}

export default CompanySearch