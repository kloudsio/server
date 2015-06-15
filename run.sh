#!/bin/bash

export PORT=3000
export MONGODB='localhost/kloudsio'
export ASSETS='../client/dist'
export JWT_KEY="kloudsh00ray"
export STRIPE_SK='sk_test_Z34c2IRtyypD4EIQjdowKeLd'

iojs index.js