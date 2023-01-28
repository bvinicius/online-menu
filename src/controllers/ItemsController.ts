

export class ProductsController {
    async function get(req, res, next) {
        try {
            res.json(await .getMultiple(req.query.page));
        } catch (err) {
            console.error(`Error while getting programming languages`, err.message);
            next(err);
        }
      }
}