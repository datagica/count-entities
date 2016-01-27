class CountEntities {
  constructor(opts = {}) {}

  countEntities(entities) {
    const entityMap = entities
      .filter(entity => (typeof entity !== "undefined" && entity !== null))
      .map(entity => (typeof entity.value !== "undefined" && entity.value !== null) ? entity.value : entity)
      .reduce((map, entity) => {
        const id = (typeof entity.id === "string" || typeof entity.id === "number") ? `${entity.id}` : entity;
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
      }, {})

    const entityArray = [];
    Object.keys(entityMap).map(id => {
      entityArray.push(entityMap[id])
    })
    // console.log("entityArray: "+JSON.stringify(entityArray));
    entityArray.sort((a, b) => {
      return a.count - b.count;
    })
    return Promise.resolve(entityArray);
  }

  tfid() {

    const nbTotalResumes = 1;
    const nbTotalDocuments = 1;

    //const skills = skillsList; // [];
    //debug("TODO");

    entities.reduce((entities, item) => {
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

      const inverseDocumentFrequency =
        nbTotalResumes / Math.log(nbTotalDocuments / Math.max(1, item.documentFrequency)) / Math.log(10);

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
}

const singletonInstance = new CountEntities();
const singletonMethod = function(...opts) {
  return singletonInstance.countEntities(...opts);
};

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.countEntities = singletonInstance;
module.exports.CountEntities = CountEntities;