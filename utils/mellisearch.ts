import { MeiliSearch } from 'meilisearch'

const searchClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MELLI_HOST as string,
    apiKey: process.env.NEXT_PUBLIC_MELLI_SEARCH_KEY,
})

// update settings to search by name attribute
searchClient.getIndex('users').then(index => {
    if(index.uid !== 'users') {
        searchClient.index('users').updateSettings({
            searchableAttributes: [
                'name'
            ],
            sortableAttributes: [
                'name'
            ],
        })
    }
})

export default searchClient