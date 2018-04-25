import rpc_client

client = rpc_client.DataServiceClient('http://localhost:4040')

print client._DataServiceClient__add(1, 4)
