import Promise from 'bluebird';
import pgp from 'pg-promise';
import { dburi } from '../config.json';

// Method that camelize columns

const camelizeColumns = (data) => {
  const template = data[0];

  for (let prop in template) {
    const camel = pgp.utils.camelize(prop);

    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

// Declaration of varaible that means "postgres" use 'bluebird' and camelize columns to data

const postgres = pgp({
  promiseLib: Promise,
  receive: (data, result, e) => { camelizeColumns(data); }
});

// Declaration of variable that means "connection" use the variable "postgres" with parameter url from database 

const connection = postgres(dburi);

export default connection;