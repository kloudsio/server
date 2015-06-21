FROM iojs:latest

#
# Klouds IO Directory
#

RUN mkdir /k-io


#
# copy package.json & npm install
#

ADD ./package.json /k-io/package.json
RUN cd /k-io && npm install -q


#
# copy all
#

ADD . ./k-io


#
# Container Settings
#

EXPOSE 8080
WORKDIR /k-io
CMD iojs serve.js


ENV PORT=8080
ENV ASSETS='/k-io/client'
ENV MONGODB='db/klouds'
ENV JWT_KEY=''
ENV STRIPE_SK=''