import React, {useEffect, useRef, useState} from 'react'
import {debounce} from 'lodash'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {useGetSearchQuery} from '../../../utils/api/apiService'
import './SearchBar.css'

interface SearchBarProps {
    setSearchResult: Function
}

const SearchBar = ({setSearchResult}: SearchBarProps) => {

    const debouncedSearch = useRef(
        debounce((searchQuery) => {
            setQuery(() => searchQuery)
        }, 400)
    ).current

    const [searchQuery, setQuery] = useState<string>('')

    const search = useGetSearchQuery(searchQuery)

    useEffect(() => {
        if (searchQuery !== '' && searchQuery !== ' ') {
            search.refetch()
        } else {
            setSearchResult(undefined)
        }
    }, [searchQuery])

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    useEffect(() => {
        if (search.isSuccess) {
            setSearchResult(search.data)
        }
    }, [search.data])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form id='search-bar--container' onSubmit={handleSubmit}>
            <div>
                <SearchRoundedIcon/>
            </div>
            <input id='search-bar--text-input' className='fs-sc-body-1 fw-regular' type='text'
                   placeholder='Search for artist, songs and ...'
                   onChange={event => debouncedSearch(event.target.value)}
                   autoComplete='off'
                   autoFocus/>
        </form>
    )
}

export default SearchBar