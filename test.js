const { request, gql } = require("graphql-request");
const fetch = require("node-fetch");
const Strapi = require("strapi");

const setup = async () => {
  const knex = strapi.connections.default;
  await knex("users-permissions_permission").update({ enabled: true });

  const adminCount = await knex("strapi_administrator").count("id AS count");
  if (adminCount[0].count == 0) {
    await knex("strapi_administrator").insert({ email: "a@a.com" });
  }

  if (!(await strapi.query("house").count())) {
    await strapi.query("house").create({
      title: "red",
      published_at: null,
    });
  }

  if (!(await strapi.query("channel").count())) {
    await strapi.query("channel").create({
      title: "north",
      house: 1,
    });
  }
};

const test = async () => {
  const response = await fetch("http://localhost:1337/channels");
  console.log(await response.json());

  const endpoint = "http://localhost:1337/graphql";
  const query = gql`
    {
      channels {
        id
        title
        house {
          id
          title
        }
      }
    }
  `;

  const data = await request(endpoint, query);
  console.log(JSON.stringify(data, undefined, 2));
};

(async () => {
  await Strapi().load();
  try {
    await setup();
    await strapi.start();
    await test();
  } catch (error) {
    console.error(error);
  } finally {
    await strapi.stop();
  }
})().catch(console.error);
