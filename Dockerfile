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
CMD bash -c source\ env.sh\ \&\&\ iojs\ serve.js

