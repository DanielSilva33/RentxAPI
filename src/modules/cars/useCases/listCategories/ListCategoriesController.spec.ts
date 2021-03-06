import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

let connection: Connection;

describe("List categories", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXX')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/api/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        await request(app)
            .post("/api/categories")
            .send({
                name: "Category supertest",
                description: "Category supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/api/categories");

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toEqual("Category supertest");
    });
});
