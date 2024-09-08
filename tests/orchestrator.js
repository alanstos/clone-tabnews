const retry = require("async-retry");

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return await retry(
      async () => {
        const response = await fetch("http://localhost:3000/api/v1/status1");
        if (response.status !== 200) {
          throw Error();
        }
      },
      {
        retries: 100,
        maxTimeout: 1000,
      },
    );
  }
}

export default {
  waitForAllServices,
};
