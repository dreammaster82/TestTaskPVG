const {DataTypes} = require('sequelize');

module.exports = function (sequelize) {
    const Staff = sequelize.define('Staff', {
        staffId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(32)},
        password: {type: DataTypes.STRING(32)}
    });

    const Person = sequelize.define('Personal', {
        personId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        firstName: {type: DataTypes.STRING},
        secondName: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING}
    });

    Staff.hasOne(Person);
    Person.belongsTo(Staff);

    return {
        Staff,
        Person
    };
};
