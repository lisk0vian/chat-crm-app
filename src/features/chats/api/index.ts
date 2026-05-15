import { searchClient } from './client.operations'

export const api = {
  queries: {
    client: {
      search: searchClient,
    },
  },
}
