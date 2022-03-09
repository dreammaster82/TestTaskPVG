module.exports = (models) => {
    const {Staff, Person} = models;

    /**
     * Find by id
     * @param {String} id
     * @return {Promise<void>}
     */
    async function getStaff(id) {
        if (!id) {
            throw Error('getStaff: Id must have');
        }

        const staff = await Staff.findByPk(id, {include: Person});

        if (!staff) {
            throw Error('getStaff: Staff not found: ' + id);
        }

        return staff;
    }

    /**
     * Find by params
     * @param {String} field
     * @param {String} value
     * @return {Promise<void>}
     */
    async function find(field, value) {
        if (!field || !value) {
            throw Error('find: Bad params');
        }

        return Person.findAll({where: {[field]: value}, include: [Staff]});
    }

    /**
     * Delete by id
     * @param {String} id
     * @return {Promise<T>}
     */
    async function deleteById(id) {
        if (!id) {
            throw Error('deleteById: Id must have');
        }

        return Staff.findByPk(id, {include: Person})
            .then(staff => Person.destroy({where: {personId: staff.personId}}))
            .then(() => Staff.destroy({where: {staffId: id}}));
    }

    async function create({name, password, ...person}) {
        if (!name || !password) {
            throw Error('create: bad params');
        }

        const staff = await Staff.create({name, password});

        const personFields = new Set(['firstName', 'secondName', 'address']);
        let checkPerson = false;
        const personData = Object.entries(person).reduce((obj, e) => {
            if (personFields.has(e[0]) && e[1] != null) {
                obj[e[0]] = e[1];
                checkPerson = true;
            }
            return obj;
        }, {});

        if (checkPerson) {
            await staff.createPerson(personData);
        }
        return staff;
    }


    return {
        getStaff,
        find,
        deleteById,
        create
    };
};
