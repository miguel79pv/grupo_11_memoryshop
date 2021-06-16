module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas";
    let cols = {
        idmarcas: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        foto: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: false
    };
    
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = function (models) {
        Marca.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'id_brand'
        })
    }

    return Marca;
}