module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        iduser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.DECIMAL
        },
        category: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Categorias, {
            as: 'categorias',
            foreignKey: 'category'
        });
    }

    return User;
}