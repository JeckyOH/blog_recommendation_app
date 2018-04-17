from cloudAMQP_client import CloudAMQPClient

SERVER_URL = 'amqp://xxihpvle:8cjkdhbgzv_PBpDNgP6g3FI_PqhhArUE@buffalo.rmq.cloudamqp.com/xxihpvle'
QUEUE_NAME = 'test'

def test():
    client = CloudAMQPClient(SERVER_URL, QUEUE_NAME)
    message = {"test": "123"}
    client.send_message(message)
    client.sleep(10)
    recv_msg = client.get_message()
    assert message == recv_msg

if __name__ == '__main__':
    test()
