module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Usuarios';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        born: {
            type: dataTypes.DATE,
            allowNull: true
        },
        address: {
            type: dataTypes.STRING,
            allowNull: true
        },
        interest: {
            type: dataTypes.STRING,
            allowNull: true
        },
        pass: {
            type: dataTypes.STRING,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        }
    };
    const config = {
        tableName: 'users',
        timestamps: false
    };

    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = (models) => {
        Usuarios.hasMany(models.Carrito, {
            as: 'carrito',
            foreignKey: 'id_name'
        });
    }

    return Usuarios;
}