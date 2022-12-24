import Typesense from 'typesense'

let client = new Typesense.Client({
    'nodes': [{
      'host': '8f17dmzgv0sxio9bp-1.a1.typesense.net', 
      'port': 443,
      'protocol': 'https'
    }],
    'apiKey': 'hMmU3fNDJdiJPTOAVilAvYHLbcvUnvD9',
    'connectionTimeoutSeconds': 2
})
//client.collections('companies').documents().upsert(document)

export default client