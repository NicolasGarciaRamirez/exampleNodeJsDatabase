import { createPool } from "mysql";
export default class Database {
	constructor() {
		this.pool = createPool({
			host: process.env.DB_HOST || 'localhost',
			user: process.env.DB_USERNAME || 'root',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_DATABASE || 'dbms'
		});
	}
	async getData(sqlQuery, params = []) {
		let data;
		try {
			data = await this.pool.promise().query(sqlQuery, params);
		} catch (e) {
			console.error(e);
			throw new Error("Failed to retrieve data");
		}
		return data[0];
	}
	// save
	async addData(tableName, dataObject) {
		const sqlQuery = `INSERT INTO ${tableName} SET ?`;
		const res = await this.getData(sqlQuery, [dataObject]);
		if (!res.id) throw new Error('Adding failed');
		else return res.id;
	}

	//update
	async updateData(tableName, id, dataObject) {
		const sqlQuery = `UPDATE ${tableName} set ? WHERE ID=?`;
		await this.getData(sqlQuery, [dataObject, id]);
		if (!res.id) throw new Error('Updated failed');
		else return res.id;
	}

	// list
	async getList(tableName, pageSize = 10, pageNum = 1 /* sortBy = "", order = "" */) {
		pageNum--;
		const offset = pageNum * pageSize;
		const limit = pageSize;
		const countSql = `SELECT COUNT(*) FROM ${tableName}`;
		const rowsSql = `SELECT * FROM ${tableName} ORDER BY createdAt DESC
		LIMIT ? OFFSET ?`;
		const [count, rows] = await Promise.all([
			this.getData(countSql),
			this.getData(rowsSql, [limit, offset])
		]);
		return {
			total: count[0]['COUNT(*)]'],
			pages: Math.ceil(count[0].COUNT / pageSize),
			data: rows
		};
	}
	// delete
	async removeData(tableName, id) {
		const sqlQuery = `DELETE FROM ${tableName} WHERE ID=?`;
		const result = await this.getData(sqlQuery, [id]);
		if (result.affectedRows === 0) throw new Error(`Removing failed
		for id=${id}`);
	}

	closeConnection() {
		if (!this.pool._closed) {
			this.pool.end();
		} else {
			console.warn('The DB Connection is already closed');
		}
	}
}

