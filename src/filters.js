// Set up filters default object

// getFilters
// Arguments: none
// Return value: filters object

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none

// Make sure to set up the exports
const filters = {
    searchText: '',
    hideCompleted: false,
    sortBy: 'edited-R'
}
const getFilters = () => filters
const setFilters = ({searchText, hideCompleted, sortBy}) => { //destructuring filters
    if (typeof searchText === 'string'){
        filters.searchText = searchText
    }
    if (typeof hideCompleted === 'boolean'){
        filters.hideCompleted = hideCompleted
    }
    if (typeof sortBy === 'string') {
        filters.sortBy = sortBy
    }
}
export {getFilters, setFilters}