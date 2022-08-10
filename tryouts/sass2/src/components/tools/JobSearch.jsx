import React from 'react'
import { country_list, industry_list, jobs_list } from '../../data/options'
import SearchBox from './SearchBox'

const JobSearch = () => {
  return (
    <SearchBox list1={country_list} list2={industry_list} list3={jobs_list} />
  )
}

export default JobSearch