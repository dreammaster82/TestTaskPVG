const {Sequelize} = require('sequelize');
const models = require('./models/staff');
const service = require('./services/staff_service');
const controller = require('./network/controllers/staff_controller');

async function start() {
    const sequelize = new Sequelize('postgres://staff_user:staff_pass@localhost:5432/staff');
    const models = models(sequelize);
    await sequelize.sync();

    const staffController = controller(models);
    service(staffController);
}

start()
    .then(() => console.log('start server'))
    .catch(e => console.log(e))
