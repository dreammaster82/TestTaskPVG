const router = require('express').Router();

function routerFn(controller) {
    /**
     * Get staff by id
     * @param {String} id
     */
    router.get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const staff = await controller.getStaff(id);
            res.json(staff);
        } catch (e) {
            next(e);
        }
    });

    /**
     * Search staff by param
     * Query params:
     * @param {String} field
     * @param {String} value
     */
    router.get('/search', async (req, res, next) => {
        const {field, value} = req.query;
        try {
            const staff = await controller.find(field, value);
            res.json(staff);
        } catch (e) {
            next(e);
        }
    });

    /**
     * Delete staff by id
     * @param {String} id
     */
    router.delete('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            await controller.deleteById(id);
            res.send('Ok');
        } catch (e) {
            next(e);
        }
    });

    /**
     * Create staff
     * Body:
     * @param {{
     *     name: string,
     *     password: string,
     *     firstName?: string,
     *     secondName?: string,
     *     address?: string
     * }} data
     *
     */
    router.post('/create', async (req, res, next) => {
        const data = req.body.data;

        try {
            const staff = await controller.create(data);
            res.json(staff);
        } catch (e) {
            next(e);
        }
    })

    return router;
}


module.exports = routerFn;
