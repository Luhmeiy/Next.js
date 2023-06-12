migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6b8754683hmw4f")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6b8754683hmw4f")

  collection.createRule = null

  return dao.saveCollection(collection)
})
