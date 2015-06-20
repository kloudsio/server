[![Stories in Ready](https://badge.waffle.io/metadevfoundation/klouds.io.svg?label=ready&title=Ready)](http://waffle.io/metadevfoundation/klouds.io)


# Klouds.io

Written with **io.js**, or nodejs with a bunch of --harmony flags.

### Dockered Mongo
```bash
KLOUDS_DATA=/location/for/klouds/db/data

mkdir -p $KLOUDS_DATA && docker pull mongo && docker run -d -p 27017:27017 -v $KLOUDS_DATA:/data/db --name klouds-mongo mongo &&echo 'Docker Mongo:' && docker ps | grep klouds-mongo

ls $KLOUDS_DATA
```

### Klouds Server Setup
```bash
npm install

vim env.sh

make start
```



## Documentation

[History](docs/history.md)

## Contact

For bugs, questions, comments, corrections, suggestions, etc., open an issue in kloudsio/klouds.io

Or just [click here](https://github.com/kloudsio/klouds.io/issues/new?title=%5BKlouds.io ... %5D%20) to create a new issue.