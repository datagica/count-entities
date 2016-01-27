"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountEntities = function () {
  function CountEntities() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CountEntities);
  }

  (0, _createClass3.default)(CountEntities, [{
    key: "countEntities",
    value: function countEntities(entities) {
      var entityMap = entities.filter(function (entity) {
        return typeof entity !== "undefined" && entity !== null;
      }).map(function (entity) {
        return typeof entity.value !== "undefined" && entity.value !== null ? entity.value : entity;
      }).reduce(function (map, entity) {
        var id = typeof entity.id === "string" || typeof entity.id === "number" ? "" + entity.id : entity;
        if (typeof map[id] === "undefined") {
          map[id] = {
            id: id,
            value: JSON.parse(JSON.stringify(entity)),
            count: 0
          };
        }
        // console.log(`map[id]: `+JSON.stringify(map[id]));
        map[id].count += 1;
        return map;
      }, {});

      var entityArray = [];
      (0, _keys2.default)(entityMap).map(function (id) {
        entityArray.push(entityMap[id]);
      });
      // console.log("entityArray: "+JSON.stringify(entityArray));
      entityArray.sort(function (a, b) {
        return a.count - b.count;
      });
      return _promise2.default.resolve(entityArray);
    }
  }, {
    key: "tfid",
    value: function tfid() {

      var nbTotalResumes = 1;
      var nbTotalDocuments = 1;

      //const skills = skillsList; // [];
      //debug("TODO");

      entities.reduce(function (entities, item) {
        if (typeof item === 'undefined' || item.domain === 'undefined') {
          debug("invalid item: " + item);
          return entities;
        }

        if (typeof entities[item.domain] === 'undefined') {
          entities[item.domain] = {};
        }
        if (typeof entities[item.domain][item.name] === 'undefined') {
          entities[item.domain][item.name] = item;
          item.nbOccurrences = 0;
          item.termFrequency = 0;
          item.inverseDocumentFrequency = 0;
        }

        item.nbOccurrences++;
        item.termFrequency = item.nbOccurrences / entitiesList.length;

        // Note: it is useless to try to save this, since it can be recomputed
        // at each Query, and if one word is changing, all other words in the db
        // should be updated with the new nbTotalDocuments too

        var inverseDocumentFrequency = nbTotalResumes / Math.log(nbTotalDocuments / Math.max(1, item.documentFrequency)) / Math.log(10);

        // TODO
        item.tf_idf = 0; // item.termFrequency * inverseDocumentFrequency;

        return entities;
      }, {});

      // some entities can only be activated if more than one keyword are triggered

      /*
      Object.keys(entities).map(domain => {
        const entities = entities[domain];
        debug(`- domain ${domain}: ${entities[domain]}`);
        Object.keys(entities).map(entity => {
          debug(`  - entity ${entity}: ${pretty(entities[entity])}`);
          //entities[key] = (entities[key] || []).filter(entity => {
          //   return (item.nbOccurrences >= entity.minimum_hits_required);
          //});
        })
      })
      */

      // todo:

      // for the TF IDF, we only consider entities, not the whole document

      //debug("entities: " + pretty(entities));
    }
  }]);
  return CountEntities;
}();

var singletonInstance = new CountEntities();
var singletonMethod = function singletonMethod() {
  return singletonInstance.countEntities.apply(singletonInstance, arguments);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.countEntities = singletonInstance;
module.exports.CountEntities = CountEntities;