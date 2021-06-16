module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        idproducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        sku: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.DECIMAL
        },
        foto: {
            type: dataTypes.STRING
        },
        id_brand: {
            type: dataTypes.INTEGER
        },    
        id_type: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Marcas, {
            as: 'marcas',
            foreignKey: 'id_brand'
        })
        Producto.belongsTo(models.Tipos, {
            as: 'tipos',
            foreignKey: 'id_type'
        })
    }

    return Producto;
}