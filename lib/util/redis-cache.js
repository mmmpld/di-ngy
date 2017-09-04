const Log = require("log");
var log = new Log("Debug");
const circularJson = require( 'circular-json' );
const redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);
client.on("error", function (err) {
    log.error("Error", err);
});

var cache = {
    readJSON: function ( jsonString ) {
        log.debug("Json", "Attempting to parse: " + jsonString);
        var jsonObject = circularJson.parse( jsonString );
        log.debug("Json", jsonObject);
        return jsonObject;
    },

    writeJSON: function ( key, data ) {
        log.debug("Info", "Writing Key: " + key + ", Data: " + data);
        client.set(key, circularJson.stringify( data ));
    },

  /**
   * Load a cache identified by the given Id. If the element does not exists, then initialize an empty
   * cache storage. If specified `cacheDir` will be used as the directory to persist the data to. If omitted
   * then the cache module directory `./cache` will be used instead
   *
   * @method load
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param [cacheDir] {String} directory for the cache entry
   */
  load: function ( docId, cacheDir ) {
    var me = this;

    me._visited = { };
    me._persisted = { };
    me._pathToFile = docId;

    log.debug("Load", docId);
    client.get(docId, function(err, reply) {
        if (err !== null) {
            log.error("Load", "Could not load from redis");
        }            
        me._persisted = me.readJSON( reply );
    });
  },

  /**
   * Load the cache from the provided file
   * @method loadFile
   * @param  {String} pathToFile the path to the file containing the info for the cache
   */
  // loadFile: function ( pathToFile ) {
  //   var me = this;
  //   var dir = path.dirname( pathToFile );
  //   var fName = path.basename( pathToFile );

  //   me.load( fName, dir );
  // },

  keys: function () {
    return Object.keys( this._persisted );
  },
  /**
   * sets a key to a given value
   * @method setKey
   * @param key {string} the key to set
   * @param value {object} the value of the key. Could be any object that can be serialized with JSON.stringify
   */
  setKey: function ( key, value ) {
    this._visited[ key ] = true;
    this._persisted[ key ] = value;
  },
  /**
   * remove a given key from the cache
   * @method removeKey
   * @param key {String} the key to remove from the object
   */
  removeKey: function ( key ) {
    delete this._visited[ key ]; // esfmt-ignore-line
    delete this._persisted[ key ]; // esfmt-ignore-line
  },
  /**
   * Return the value of the provided key
   * @method getKey
   * @param key {String} the name of the key to retrieve
   * @returns {*} the value from the key
   */
  getKey: function ( key ) {
    this._visited[ key ] = true;
    return this._persisted[ key ];
  },

  /**
   * Remove keys that were not accessed/set since the
   * last time the `prune` method was called.
   * @method _prune
   * @private
   */
  _prune: function () {
    var me = this;
    var obj = { };

    var keys = Object.keys( me._visited );

    // no keys visited for either get or set value
    if ( keys.length === 0 ) {
      return;
    }

    keys.forEach( function ( key ) {
      obj[ key ] = me._persisted[ key ];
    } );

    me._visited = { };
    me._persisted = obj;
  },

  /**
   * Save the state of the cache identified by the docId to disk
   * as a JSON structure
   * @param [noPrune=false] {Boolean} whether to remove from cache the non visited files
   * @method save
   */
  save: function ( noPrune ) {
    var me = this;

    (!noPrune) && me._prune();
    this.writeJSON( me._pathToFile, me._persisted );
  },

  /**
   * remove the file where the cache is persisted
   * @method removeCacheFile
   * @return {Boolean} true or false if the file was successfully deleted
   */
  removeCacheFile: function () {
    return del( this._pathToFile, { force: true } );
  },
  /**
   * Destroy the file cache and cache content.
   * @method destroy
   */
  destroy: function () {
    var me = this;
    me._visited = { };
    me._persisted = { };

    me.removeCacheFile();
  }
};

module.exports = {
  /**
   * Alias for create. Should be considered depreacted. Will be removed in next releases
   *
   * @method load
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param [cacheDir] {String} directory for the cache entry
   * @returns {cache} cache instance
   */
  load: function ( docId, cacheDir ) {
    return this.create( docId, cacheDir );
  },

  /**
  * Load a cache identified by the given Id. If the element does not exists, then initialize an empty
  * cache storage.
  *
  * @method create
  * @param docId {String} the id of the cache, would also be used as the name of the file cache
  * @param [cacheDir] {String} directory for the cache entry
  * @returns {cache} cache instance
  */
  create: function ( docId, cacheDir ) {
    var obj = Object.create( cache );
    obj.load( docId, cacheDir );
    return obj;
  },

  // createFromFile: function ( filePath ) {
  //   var obj = Object.create( cache );
  //   obj.loadFile( filePath );
  //   return obj;
  // },
  /**
   * Clear the cache identified by the given id. Caches stored in a different cache directory can be deleted directly
   *
   * @method clearCache
   * @param docId {String} the id of the cache, would also be used as the name of the file cache
   * @param cacheDir {String} the directory where the cache file was written
   * @returns {Boolean} true if the cache folder was deleted. False otherwise
   */
  // clearCacheById: function ( docId, cacheDir ) {
  //   var filePath = cacheDir ? path.resolve( cacheDir, docId ) : path.resolve( __dirname, './.cache/', docId );
  //   return del( filePath, { force: true } ).length > 0;
  // },
  /**
   * Remove all cache stored in the cache directory
   * @method clearAll
   * @returns {Boolean} true if the cache folder was deleted. False otherwise
   */
  // clearAll: function ( cacheDir ) {
  //   var filePath = cacheDir ? path.resolve( cacheDir ) : path.resolve( __dirname, './.cache/' );
  //   return del( filePath, { force: true } ).length > 0;
  // }
};
