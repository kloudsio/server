#!/bin/bash

export PORT=3000
export MONGODB='dev.klouds.io/klouds'
export ASSETS='../client/dist'
export JWT_KEY="board... haha"

export STRIPE_SK='sk_test_ninja-turtles-behind-u!'

iojs serve.js
