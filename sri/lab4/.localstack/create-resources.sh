echo "Creating localstack resources..."

# bolid -> topic fanout

awslocal \
    sqs create-queue \
    --queue-name bolid--topic \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name topic--logger \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name topic--monitor \
    --endpoint-url http://localhost:4566


awslocal \
    sns create-topic \
    --name topic \
    --endpoint-url http://localhost:4566

awslocal \
    sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:000000000000:topic \
    --protocol sqs \
    --notification-endpoint arn:aws:sqs:us-east-1:000000000000:topic--logger \
    --endpoint-url http://localhost:4566

awslocal \
    sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:000000000000:topic \
    --protocol sqs \
    --notification-endpoint arn:aws:sqs:us-east-1:000000000000:topic--monitor \
    --endpoint-url http://localhost:4566


# bolid <-> master

awslocal \
    sqs create-queue \
    --queue-name bolid--master \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name master--bolid \
    --endpoint-url http://localhost:4566


echo "Localstack resources created"