var { saveCache, getValueByKey, deleteCache } = require("../../controllers/cacheControllers")
const { sequelize } = require("../../models")
const { cache: cacheModel } = sequelize.models

describe("cache controllers tests", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should test save Cache function", async () => {

        const req = {
            body: {
                key: "test",
                value: "test"
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };

        cacheModel.findOne = jest.fn().mockResolvedValue(null)
        cacheModel.create = jest.fn().mockResolvedValue({
            key: "test",
            value: "test"
        })


        await saveCache(req, res)

        expect(res.status).toHaveBeenCalledWith(201);

    })

    it("should test get Cache function", async () => {

        const req = {
            params: {
                key: "test"
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };

        cacheModel.findByPk = jest.fn().mockResolvedValue({
            key: "test",
            value: "test"
        })

        await getValueByKey(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "cache": {
                key: "test",
                value: "test"
            }
        });

    })

    it("should test delete Cache function", async () => {
        const req = {
            params: {
                key: "test"
            }
        }
        const res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };
        cacheModel.findByPk = jest.fn().mockResolvedValue({
            key: "test",
            value: "test"
        })
        cacheModel.destroy = jest.fn().mockResolvedValue(null)
        
        await deleteCache(req, res)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ "message" : "deleted successfully" });
    })


})
