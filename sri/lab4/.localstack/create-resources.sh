echo "Creating localstack resources..."

awslocal \
    sqs create-queue \
    --queue-name bolid--logger \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name bolid--monitor \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name bolid--master \
    --endpoint-url http://localhost:4566

awslocal \
    sqs create-queue \
    --queue-name master--bolid \
    --endpoint-url http://localhost:4566

echo "Localstack resources created"