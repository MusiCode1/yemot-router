
module.exports = (sequelize, type) => {
    return sequelize.define('name', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'ID'
        },

        phone: {
          type: type.STRING(12),
          field: 'Phone'
        },

        name: {
            type: type.STRING(70),
            field: 'Name'
        },

        first_name: type.STRING(50),

        last_name: type.STRING(50),

        compny_name: type.STRING(50),

        email: {
            type: type.STRING(25),
            field: 'Email'
        },

        type: {
            type: type.TINYINT(1)
        },

        update_by: {
            type: type.STRING(15),
            field: 'UpdateBy'
        }

    }, {
        modelName: 'name',

        tableName: 'Names',

        indexes: [
            {
                fields: ['Name']
            },

            {
                fields: ['Phone']
            }
        ],

        createdAt: 'UpdateDate',

        updatedAt: false,

    });
}