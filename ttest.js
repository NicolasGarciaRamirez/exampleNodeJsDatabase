import Database from "./database";

const conectionDatabase = new Database();

const dataUser = {
	name: 'John Doe'
}
conectionDatabase.addData('users', [dataUser])

conectionDatabase.removeData('user', x)