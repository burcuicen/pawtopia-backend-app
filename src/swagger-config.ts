import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pawtopia API",
      version: "1.0.0",
      description: "Pawtopia API",
      contact: {
        name: "Burcu İçen",
      },
    },
    servers: [
      {
        url:'http://localhost:8080/',
      },
      {
        url: 'https://pawtopia-gkii.onrender.com/'
      }
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./dist/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerOptions, swaggerDocs };

