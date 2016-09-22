import _ from 'lodash';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import EventEmitter from 'events';
import fs from 'fs';
import config from '../config/environment';
import Migration from './migration.model';

mongoose.Promise = Promise;

const EVENT_LOADED = 'LOADED';
const EVENT_COMPLETED = 'COMPLETED';
const EVENT_DO = 'DO';

const env = process.env.NODE_ENV;

console.log(`=====> migration environment: [${env}]`);

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', (err) => {
  console.error(err.toString());
  process.exit(-1);
});

export default class Sync extends EventEmitter {

  constructor() {
    super();
    const migrationPath = `${__dirname}/migrations`;
    if (fs.existsSync(migrationPath)) {
      this.migrationFiles = fs.readdirSync(`${__dirname}/migrations`).filter((file) =>
        file.match(/^\d+.*\.js$/)
      ).sort().map((file) =>
        file.toString()
      );
    }
    this.migrations = [];
    this.count = 0;
    this.on(EVENT_LOADED, this._migrate);
    this.on(EVENT_COMPLETED, this._complete);
  }

  migrate() {
    this._load();
  }

  _load() {
    if (!this.migrationFiles) {
      console.log('=====> no migration file exists, exit!');
      return process.exit(0);
    }
    const self = this;
    let last;
    let pos = -1;
    return Migration.find().sort({ createdAt: -1 }).limit(1).exec()
      .then(records => {
          if (records.length) {
            last = records[0].title;
            console.log(`=====> the last migration name is: [${last}]`);
          } else {
            console.log('=====> no migration information exist in target db');
          }
          if (last) {
            pos = _.indexOf(self.migrationFiles, last);
          }
          self.migrations = _.slice(self.migrationFiles, pos + 1);
          if (self.migrations.length) {
            console.log(`=====> found scripts need to do migration: [${self.migrations.toString()}]`);
            self.migrations = _.map(self.migrations, migrationFile => {
              /* eslint-disable global-require */
              const migration = require(`${__dirname}/migrations/${migrationFile}`).default;
              /* eslint-enable global-require */
              migration.title = migrationFile;
              return migration;
            });
            return self.emit(EVENT_LOADED);
          }
          console.log('=====> no new migration scripts found. Exit!');
          return process.exit(0);
        }
      )
      .catch((err) => {
        console.error(err.toString());
        process.exit(1);
      });
  }

  _complete() {
    console.log('=====> migration completed with %s migration executed', this.count);
    process.exit(0);
  }

  _migrate() {
    const self = this;
    let migration;

    function next(err) {
      // error from previous migration
      if (err) {
        console.error(err.toString());
        process.exit(1);
      }

      const emitter = new EventEmitter();
      emitter.on(EVENT_DO, () => {
        migration = self.migrations.shift();

        if (!migration) {
          self.emit(EVENT_COMPLETED);
          return;
        }
        console.log(`=====> start to do migration: [${migration.title}]`);
        migration(next);
      });

      if (migration) {
        new Migration({ title: migration.title }).save().then(() => {
          console.log(`=====> successfully do migration for [${migration.title}]`);
          self.count += 1;
          emitter.emit(EVENT_DO);
        }).catch(error => {
          console.error(error.toString());
          process.exit(1);
        });
      } else {
        emitter.emit(EVENT_DO);
      }
    }

    next(null);
  }

}
