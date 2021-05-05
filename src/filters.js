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
const setFilters = (updates) => {
    if (typeof updates.searchText === 'string'){
        filters.searchText = updates.searchText
    }
    if (typeof updates.hideCompleted === 'boolean'){
        filters.hideCompleted = updates.hideCompleted
    }
    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}
export {getFilters, setFilters}