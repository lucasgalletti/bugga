module.exports = (sequelize, dataTypes) => {

    const alias = 'Carrito';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_name: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_author: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        qty: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total_purchase: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        date_purchase: {
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        discount: {
            type: dataTypes.DECIMAL,
            allowNull: true
        },
        state: {
            type: dataTypes.INTEGER,
            allowNull: true
        }

    };

    const config = {
        tableName: 'shop',
        timestamps: false
    };

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = (models) => {
        Carrito.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey: 'id_name'
        });
            Carrito.belongsTo(models.Autores, {
            as: 'autores',
            foreignKey: 'id_author'
        });
            Carrito.belongsTo(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'id_user'
        });
    };

return Carrito;

}