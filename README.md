[![Stories in Ready](https://badge.waffle.io/metadevfoundation/klouds.io.svg?label=ready&title=Ready)](http://waffle.io/metadevfoundation/klouds.io)


# Klouds.io

Written with **io.js**, or nodejs with a bunch of --harmony flags.


```bash

# type me
KLOUDSDATA=/data/klouds

# paste me

mkdir -p $KLOUDSDATA &&\
docker pull mongo && docker run -d \
	-p 27017:27017 \
	-v $KLOUDSDATA:/data/db \
	--name klouds-mongo \
	mongo;

echo 'Docker Mongo:'; docker ps | grep mongo; echo 'Data Dir: Contents'; ls $KLOUDSDATA

# install dependencies
make install


# modify & run this script
nano run.sh
./run.sh

```



## Documentation

[History](docs/history.md)

## Contact

For bugs, questions, comments, corrections, suggestions, etc., open an issue in kloudsio/klouds.io

Or just [click here](https://github.com/kloudsio/klouds.io/issues/new?title=%5BKlouds.io ... %5D%20) to create a new issue.