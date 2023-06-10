#!/bin/bash

curl -i -XPOST http://localhost:8098/riak/s29711 -H "Content-Type: application/json" -d '{"test":123}'