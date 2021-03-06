import arangojs from 'arangojs'
import Schema from './schema'


export default class Model {


	static options = null // connection options
	static schema = null // user schema

	static _normalSchema = null
	static _collection = null
	static _database = null


	static _getSchema() {
		if (!this._normalSchema) {
			this._normalSchema = new Schema(this.schema)
		}
		return this._normalSchema
	}


	static async _getDatabase() {
		if (Model._database) {
			return Model._database
		}

		let dbName = this.options.database
		let host = this.options.host || 'localhost'
		let port = this.options.port || 8529
		let username = this.options.username || 'root'
		let password = this.options.password || ''


		let db = arangojs({
			url: `http://${username}:${password}@${host}:${port}`,
		})

		try {
			await db.createDatabase(dbName)
		} catch (e) {
		}

		db.useDatabase(dbName)

		Model._database = db
		return db
	}


	static async _getCollection() {
		if (this._collection) {
			return this._collection
		}

		let db = await this._getDatabase()
		let collection = db.collection(this.name)
		try {
			await collection.create()
			await this._setIndexes(collection)
		} catch (e) {
		}
		return this._collection = collection
	}


	static async _setIndexes(collection) {
		let schema = this._getSchema()
		for (let field of schema) {
			if (!field.options.index) continue

			let path = field.path.join('.')
			let unique = field.options.unique
			await collection.createHashIndex(path, {unique})
		}
	}


	static async _call(method, ...args) {
		try {
			let collection = await this._getCollection()
			if (!collection[method]) {
				throw Error(`Collection has not method '${method}'`)
			}
			return await collection[method](...args)

		} catch (error) {
			console.error(error)
		}
	}


	static _validate(data) {
		let schema = this._getSchema()
		schema.validate(data)
	}


	static _getDocument(documentHandle) {
		return this._call('document', documentHandle)
	}


	static _getDocuments(documentHandles) {
		return this._call('lookupByKeys', documentHandles)
	}


	static _createModelByDocument(document) {
		let model = Object.create(this.prototype)
		this._documentToModel(model, document)
		model.constructor()
		return model
	}


	static _documentToModel(model, document) {
		let schema = this._getSchema()
		schema.documentToModel(model, document)
		return model
	}


	static _modelToDocument(model) {
		let schema = this._getSchema()
		let document = {}
		schema.modelToDocument(model, document)
		return document
	}


	/******************* public static methods *******************/


	static async add(data) {
		this._validate(data)
		data = this._modelToDocument(data)
		data._removed = false
		let documentHandle = await this._call('save', data)
		let document = await this._call('document', documentHandle)
		return this._createModelByDocument(document)
	}


	static async get(documentHandle) {
		let document = await this._getDocument(documentHandle)
		return this._createModelByDocument(document)
	}


	static async getArr(documentHandles) {
		let documents = await this._getDocuments(documentHandles)
		return documents.map(document => {
			return this._createModelByDocument(document)
		})
	}


	static async save(model) {
		this._validate(model)
		let document = this._modelToDocument(model)
		let newHandle = await this._call('update', model._id, document)
		model._rev = newHandle._rev
		return model
	}


	static async update(model) {
		let document = await this._getDocument(model)
		this._documentToModel(model, document)
		return model
	}


	static async remove(model) {
		model._removed = true
		return this.save(model)
	}


	static async restore(model) {
		model._removed = false
		return this.save(model)
	}


	static async find(selector, skip = 0, limit = 100) {
		if (!selector) selector = {}
		limit = Math.min(Math.max(limit, 0), 100)
		selector._removed = false
		let cursor = await this._call('byExample', selector, {skip, limit})
		let documents = await cursor.all()
		return documents.map(document => {
			return this._createModelByDocument(document)
		})
	}


	static async findOne(selector, skip = 0) {
		let models = await this.find(selector, skip, 1)
		let model = models[0]
		return model || null
	}


	static async count(selector) {
		let cursor = await this._call('byExample', selector)
		return cursor.count
	}


	static async have(selector) {
		let model = await this.findOne(selector)
		return !!model
	}


	/******************* public methods *******************/


	async save() {
		return this.constructor.save(this)
	}


	async update() {
		return this.constructor.update(this)
	}


	async remove() {
		return this.constructor.remove(this)
	}


	async restore() {
		return this.constructor.restore(this)
	}

}

