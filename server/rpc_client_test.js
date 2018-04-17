var rpc_client = require('./rpc_client')

var test_f = async () => {
  console.log(await rpc_client.add(1, 2));
}

test_f();
