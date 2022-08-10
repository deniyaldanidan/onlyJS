import React from 'react'
import { country_list, industry_list, investors_list } from '../../data/options'
import SearchBox from './SearchBox'

const IndustrySearch = () => {
  return (
    <SearchBox list1={country_list} list2={industry_list} list3={investors_list} />
  )
}

export default IndustrySearch