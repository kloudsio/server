FROM iojs:onbuild

RUN ASDF=/klouds/server mkdir -p $ASDF &&\
  cd $ASDF &&\
  git clone https://github.com/kloudsio/server $ASDF &&\

WORKDIR /klouds/server
CMD make run
