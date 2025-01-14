const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const { v4: uuidv4 } = require("uuid");

class PreferenceML {
  #client;
  #preference;
  #getMLAcessToken =
    process.env.DEVELOPMENT_ENVIROMENT === "prod"
      ? process.env.PROD_ACCESS_TOKEN
      : process.env.TEST_ACCESS_TOKEN;

  constructor() {
    this.#client = new MercadoPagoConfig({
      accessToken: this.#getMLAcessToken,
      options: {
        timeout: 5000,
      },
    });

    this.#preference = new Preference(this.#client);
  }

  async #createPreference({ cart }) {
    const body = {
      items: cart?.map((item) => ({
        id: uuidv4(),
        title: String(item?.title),
        currency_id: "BRL",
        picture_url: String(item?.imgs?.main),
        description: "Game",
        category_id: "game",
        quantity: 1,
        unit_price: Number(item?.price),
      })),
      payer: {
        name: "Allisson Gmail Teste",
        // surname: "Silva",
        email: "allisson.boiane00@gmail.com",
        // phone: {
        //   area_code: "11",
        //   number: "4444-4444",
        // },
        // identification: {
        //   type: "CPF",
        //   number: "19119119100",
        // },
        // address: {
        //   street_name: "Street",
        //   street_number: 123,
        //   zip_code: "06233200",
        // },
      },
      back_urls: {
        success: process.env.FRONT_END_URL,
        failure: process.env.FRONT_END_URL,
        pending: process.env.FRONT_END_URL,
      },
      // auto_return: "approved",
      payment_methods: {
        // excluded_payment_methods: [
        //   {
        //     id: "master",
        //   },
        // ],
        // excluded_payment_types: [
        //   {
        //     id: "ticket",
        //   },
        // ],
        installments: 12,
      },
      // notification_url: "https://www.your-site.com/ipn",
      // statement_descriptor: "MEUNEGOCIO",
      // external_reference: "Reference_1234",
      // expires: true,
      // expiration_date_from: "2016-02-01T12:00:00.000-04:00",
      // expiration_date_to: "2016-02-28T12:00:00.000-04:00",
      shipments: {
        cost: 1000,
        mode: "not_specified",
      },
      statement_descriptor: "MEUNEGOCIO",
    };

    try {
      const response = await this.#preference.create({ body });

      return {
        success: true,
        message: "Sucesso ao criar preferencia",
        response,
      };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao criar preferencia",
        error,
      };
    }
  }

  async processPreference({ cart }) {
    return this.#createPreference({ cart });
  }
}

class PaymentML {
  #client;
  #payment;
  response;
  #getMLAcessToken =
    process.env.DEVELOPMENT_ENVIROMENT === "prod"
      ? process.env.PROD_ACCESS_TOKEN
      : process.env.TEST_ACCESS_TOKEN;

  constructor() {
    this.#client = new MercadoPagoConfig({
      accessToken: this.#getMLAcessToken,
      options: {
        timeout: 5000,
      },
    });

    this.#payment = new Payment(this.#client);
  }

  async processPayment(body) {
    return this.#createPayment(body);
  }

  async #createPayment(body) {
    try {
      this.response = await this.#payment.create({ body });

      return {
        success: true,
        message: "Sucesso ao processar pagamento",
        response: this.response,
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao processar pagamento: ${error?.message}`,
        error,
      };
    }
  }
}

module.exports = { PaymentML, PreferenceML };
