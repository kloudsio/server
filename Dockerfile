FROM iojs:latest

RUN mkdir /k-io
ADD ./package.json /k-io/package.json
RUN cd /k-io && npm install -q

# Add everything else after npm install
ADD . ./k-io

WORKDIR /k-io
CMD bash -c source\ env.sh\ \&\&\ iojs\ serve.js

# ENV PORT 3000
# ENV MONGODB db/klouds
# ENV ASSETS /k-io/client
# ENV JWT_KEY your_session_key
# ENV STRIPE_SK sk_test_LLLLLLLLLLLLLLLONGNESS
