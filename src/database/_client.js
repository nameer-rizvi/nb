const config = require("../config");
const nanoid = require("nanoid");
const redis = require("./_client.redis");
const simpul = require("simpul");
const util = require("../util");

class Database {
  constructor() {
    this.connection = null;
    this.storeKey = `${config.redisKey}:store`;
    this.collectionKey = `${config.redisKey}:collection`;
    this.storeSizeMax = Math.pow(nanoid.urlAlphabet.length, config.nanoidSize);
    this.ids = [];
  }

  async size() {
    if (!this.connection) this.connection = await redis.connect();
    const memory = await this.connection.info("memory");
    const memorySplit = memory.split("\n");
    const memoryUsed = memorySplit.find((i) => i.startsWith("used_memory:"));
    const bytes = parseFloat(memoryUsed.split(":")[1]);
    const mb = simpul.math.num(bytes / 1000000);
    const storeSize = await this.connection.hLen(this.storeKey);
    const storeSizeMax = this.storeSizeMax;
    const storeSizeCapacity = simpul.math.percent(storeSize, storeSizeMax);
    const collectionKeys = await this.connection.keys(this.collectionKey + "*");
    const collections = collectionKeys.length;
    util.log.database(`size ("${mb}mb")`);
    return {
      bytes,
      mb,
      storeSize,
      storeSizeMax,
      storeSizeCapacity,
      collections,
    };
  }

  async add(...records) {
    return this.#decorator(this.#addRecord, ...records);
  }

  async get(...queries) {
    return this.#decorator(this.#getRecord, ...queries);
  }

  async mod(...records) {
    return this.#decorator(this.#modRecord, ...records);
  }

  async cut(...queries) {
    return this.#decorator(this.#cutRecord, ...queries);
  }

  async #decorator(handler, ...inputs) {
    if (!inputs.length) return [];
    if (!this.connection) this.connection = await redis.connect();
    const pipeline = this.connection.multi();
    const timestamp = Date.now();
    const results = [];
    for (const input of inputs) {
      const result = await handler.call(this, pipeline, input, timestamp);
      results.push(result);
    }
    await pipeline.exec();
    return inputs.length === 1 ? results[0] : results;
  }

  async #addRecord(pipeline, record, createdAt) {
    if (simpul.isObject(record)) {
      if (!simpul.isStringValid(record.collection))
        throw new Error("Record collection is invalid.");
      delete record.id;
      const id = await this.#generateUniqueId();
      const newRecord = { id, ...record, createdAt };
      pipeline.hSet(this.storeKey, id, JSON.stringify(newRecord));
      pipeline.lPush(`${this.collectionKey}:${record.collection}`, id);
      util.log.database(`add record ("${id}")`);
      return newRecord;
    }
  }

  async #getRecord(pipeline, query) {
    if (simpul.isObject(query)) {
      if (query.id) {
        util.log.database(`get record ("${query.id}")`);
        return await this.#getById(query.id);
      } else if (query.collection) {
        util.log.database(`get records ("${query.collection}")`);
        return await this.#getByCollection(query.collection);
      }
    }
  }

  async #modRecord(pipeline, record, updatedAt) {
    if (simpul.isObject(record)) {
      if (record.id) {
        const rec = await this.#getById(record.id);
        if (rec) {
          Object.assign(rec, record, { updatedAt });
          pipeline.hSet(this.storeKey, rec.id, JSON.stringify(rec));
        }
        util.log.database(`mod record ("${record.id}")`);
        return rec;
      } else if (record.collection) {
        const recs = await this.#getByCollection(record.collection);
        for (const rec of recs) {
          Object.assign(rec, record, { updatedAt });
          pipeline.hSet(this.storeKey, rec.id, JSON.stringify(rec));
        }
        util.log.database(`mod records ("${record.collection}")`);
        return recs;
      }
    }
  }

  async #cutRecord(pipeline, query) {
    if (simpul.isObject(query)) {
      if (query.id) {
        const rec = await this.#getById(query.id);
        if (rec) {
          pipeline.hDel(this.storeKey, rec.id);
          pipeline.lRem(`${this.collectionKey}:${rec.collection}`, 1, rec.id);
        }
        util.log.database(`cut record ("${query.id}")`);
        return { id: query.id };
      } else if (query.collection) {
        const recs = await this.#getByCollection(query.collection);
        for (const rec of recs) {
          pipeline.hDel(this.storeKey, rec.id);
          pipeline.lRem(`${this.collectionKey}:${rec.collection}`, 1, rec.id);
        }
        util.log.database(`cut records ("${query.collection}")`);
        return { collection: query.collection };
      }
    }
  }

  async #generateUniqueId() {
    while (this.ids.length < this.storeSizeMax) {
      let id = nanoid.nanoid(config.nanoidSize);
      while (this.ids.findIndex((i) => i === id) !== -1) {
        id = nanoid.nanoid(config.nanoidSize);
      }
      this.ids.push(id);
      const exists = await this.connection.hExists(this.storeKey, id);
      if (exists === false) return id;
    }
    throw new Error("Database store is at maximum capacity.");
  }

  async #getById(id) {
    if (simpul.isString(id)) {
      const record = await this.connection.hGet(this.storeKey, id);
      return simpul.parsejson(record);
    }
  }

  async #getByCollection(collection) {
    if (simpul.isString(collection)) {
      const jsons = [];
      const collectionKey = `${this.collectionKey}:${collection}`;
      const ids = await this.connection.lRange(collectionKey, 0, -1);
      if (!ids.length) return jsons;
      const records = await this.connection.hmGet(this.storeKey, ids);
      for (const record of records) jsons.push(simpul.parsejson(record));
      return jsons;
    }
  }
}

module.exports = new Database();

// https://redis.io/docs/latest/develop/get-started/document-database/
// https://zelark.github.io/nano-id-cc/
