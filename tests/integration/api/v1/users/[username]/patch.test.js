import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import password from "models/password";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/v1/users", () => {
  describe("Anonymous user", () => {

    test("With noexistent username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/usuarioInexistente", 
        {
          method: "PATCH",
        }
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "Usuário não encontrado",
        action: "Verifique o nome do usuário",
        status_code: 404,
      });
    });

    test("With duplicated 'username' ", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
          email: "user1@fake.com",
          password: "senha123",
        }),
      });

      expect(user1Response.status).toBe(201);

      const user2Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user2",
          email: "user2@fake.com",
          password: "senha123",
        }),
      });

      expect(user2Response.status).toBe(201);

      const response = await fetch("http://localhost:3000/api/v1/users/user2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
        }),
      }); 

      expect(response.status).toBe(400);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Username already registered",
        action: "change_username",
        status_code: 400,
      });    

    });

    test("With duplicated 'email' ", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "email1",
          email: "email1@fake.com",
          password: "senha123",
        }),
      });

      expect(user1Response.status).toBe(201);

      const user2Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "email2",
          email: "email2@fake.com",
          password: "senha123",
        }),
      });

      expect(user2Response.status).toBe(201);

      const response = await fetch("http://localhost:3000/api/v1/users/email2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "email1@fake.com",
        }),
      }); 

      expect(response.status).toBe(400);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Email already registered",
        action: "change_email",
        status_code: 400,
      });    

    });  
    
    test("With UNIQUE 'username' ", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "uniqueUser1",
          email: "uniqueUser1@fake.com",
          password: "senha123",
        }),
      });

      expect(user1Response.status).toBe(201);


      const response = await fetch("http://localhost:3000/api/v1/users/uniqueUser1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "uniqueUserNovo",
        }),
      }); 

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueUserNovo",
        email: "uniqueUser1@fake.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });  

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new 'password' ", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "userNewPassword1",
          email: "userNewPassword1@fake.com",
          password: "userNewPassword1",
        }),
      });

      expect(user1Response.status).toBe(201);


      const response = await fetch("http://localhost:3000/api/v1/users/userNewPassword1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: "userNewPassword2",
        }),
      }); 

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "userNewPassword1",
        email: "userNewPassword1@fake.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });  

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findOneByUsername("userNewPassword1");
      const isPasswordCorrect = await password.compare("userNewPassword2", userInDatabase.password);
      const isPasswordIncorrect = await password.compare("userNewPassword1", userInDatabase.password);

      expect(isPasswordCorrect).toBe(true);
      expect(isPasswordIncorrect).toBe(false);
    });     
  });
});
