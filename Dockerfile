FROM iojs:latest

RUN mkdir /k-io
ADD . /k-io
RUN cd /k-io && npm install -q

WORKDIR /k-io
CMD ["iojs", "serve.js"]

ENV PORT 3000
ENV MONGODB db/klouds
ENV ASSETS /k-io/client
ENV JWT_KEY 12345678999999999
ENV STRIPE_SK sk_test_Z34c2IRtyypD4EIQjdowKeL
