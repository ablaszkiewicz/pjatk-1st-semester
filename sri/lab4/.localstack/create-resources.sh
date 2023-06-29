echo "Creating localstack resources..."

# bolid -> topic fanout

awslocal \
    sns create-topic \
    --name topic \
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

# monitor <-> failure topic (to mechanic or to bolid)

awslocal \
    sns create-topic \
    --name failure \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name failure--mechanic \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name failure--bolid \
    --endpoint-url http://localhost:4566

# create subscription failure -> failure--mechanic with filter on message attributes

awslocal \
    sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:000000000000:failure \
    --protocol sqs \
    --notification-endpoint arn:aws:sqs:us-east-1:000000000000:failure--mechanic \
    --endpoint-url http://localhost:4566 \
    --attributes '{"FilterPolicy": "{\"importance\": [\"low\", \"high\"]}"}'


awslocal \
    sns subscribe \
    --topic-arn arn:aws:sns:us-east-1:000000000000:failure \
    --protocol sqs \
    --notification-endpoint arn:aws:sqs:us-east-1:000000000000:failure--bolid \
    --endpoint-url http://localhost:4566 \
    --attributes '{"FilterPolicy": "{\"importance\": [\"high\"]}"}'


echo "Localstack resources created"