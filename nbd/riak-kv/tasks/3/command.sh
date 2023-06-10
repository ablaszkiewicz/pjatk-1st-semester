#!/bin/bash

curl -i -XPUT http://localhost:8098/riak/s29711/key1 -H "Content-Type: application/json" -d '{"1": "123", "2": 123, "3": 123, "4": 123, "5": 123}'
curl -i -XGET http://localhost:8098/riak/s29711/key1