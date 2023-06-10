#!/bin/bash

curl -i -XDELETE http://localhost:8098/riak/s29711/key1
curl -i -XGET http://localhost:8098/riak/s29711/key1