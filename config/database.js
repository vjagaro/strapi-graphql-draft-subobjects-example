module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: env("DATABASE_CLIENT", "sqlite"),
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
        host: env("DATABASE_HOST", env("DATABASE_CLIENT", "localhost")),
        port: env.int(
          "DATABASE_PORT",
          env("DATABASE_CLIENT") === "postgres" ? 5432 : 3306
        ),
        database: env("DATABASE_NAME", "strapi"),
        username: env("DATABASE_USER", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        schema: "public",
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
