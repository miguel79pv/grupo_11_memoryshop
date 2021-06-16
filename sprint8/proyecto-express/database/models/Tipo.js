module.exports = (sequelize, dataTypes) => {
    let alias = "Tipos";
    let cols = {
        idtipomemoria: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'type_memory',
        timestamps: false
    };
    
    const Tipo = sequelize.define(alias, cols, config);

    Tipo.associate = function (models) {
        Tipo.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'id_type'
        })
    }

    return Tipo;
}