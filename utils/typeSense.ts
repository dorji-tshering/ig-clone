import Typesense from 'typesense'

let client = new Typesense.Client({
    'nodes': [{
      'host': process.env.NEXT_PUBLIC_TYPESENSE_HOST as string, 
      'port': 443,
      'protocol': 'https'
    }],
    'apiKey': process.env.NEXT_PUBLIC_TYPESENSE_KEY as string,
    'connectionTimeoutSeconds': 2
})
//client.collections('companies').documents().upsert(document)

export default client