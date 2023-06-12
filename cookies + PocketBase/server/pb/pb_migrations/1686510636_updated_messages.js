migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6b8754683hmw4f")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user = @request.auth.id"
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6b8754683hmw4f")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
