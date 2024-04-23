const roleFunctionsJson = require('./roleFunctions.json');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const session = client.startSession();

    try {

      const operation = `${__filename.split('migrations').pop()}`

      const oldUser = await db.collection("users").deleteMany()
      const oldRole = await db.collection('roles').deleteMany()
      const oldFuntion = await db.collection('functions').deleteMany()

      console.log(`[${operation}] Deleted data in collection: users, roles, functions`, oldUser, oldRole, oldFuntion)

      const insertFunctions = await db.collection('functions').insertMany(roleFunctionsJson)

      console.log(`[${operation}] Inserted new role functions`, insertFunctions)

      const superAdmin = await db.collection('roles').findOneAndUpdate(
        {
          "roleName": "Super Admin"
        },
        {

          "description": "Super Admin has all the rights",
          "sites": [
            "*"
          ],
          "createdBy": "SYSTEM",
          "updatedBy": "admin",
          "createdAt": {
            "$date": "2024-02-15T12:01:08.084Z"
          },
          "updatedAt": {
            "$date": "2024-04-22T08:22:10.137Z"
          },
          "__v": 0,
          "userIds": [
          ],
          "functions_lookUp": roleFunctionsJson,
          "roleName": "Super Admin"
        },
        { new: true, upsert: true }
      )

      console.log(`[${operation}] Inserted document:`, superAdmin)

      const userAdmin = await db.collection('users').findOneAndUpdate(
        { userName: "admin" },
        {
          "userName": "admin",
          "firstName": "admin",
          "lastName": "NextJsCMS",
          "email": "admin@nextjscms.com",
          "roles": [
            superAdmin?._id
          ],
          "password": "$2a$10$bMnxd64YuJZEU2yVvEVhju0TQBZePCs5y/eZ1QNkPw16e5FWw1KXS",
          "createdBy": "sally",
          "updatedBy": "sally",
          "createdAt": {
            "$date": "2024-02-15T12:11:08.050Z"
          },
          "updatedAt": {
            "$date": "2024-02-15T12:11:08.050Z"
          },
          "__v": 0,
          "status": 0
        })

      console.log(`[${operation}] Inserted document:`, userAdmin)

      const addUserToAdmin = await db.collection('roles').findOneAndUpdate({
        roleName: "admin"
      }, {
        userIds: { $push: [userAdmin?._id] }
      }, { new: true })

      console.log(`[${operation}] Updated document:`, addUserToAdmin)

    } catch (err) {
      console.log(`${__filename} err`, err);
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
