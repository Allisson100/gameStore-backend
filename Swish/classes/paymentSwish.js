const fs = require("fs");
const https = require("https");
const path = require("path");
const axios = require("axios");

class PaymentSwish {
  #agent;
  #client;

  constructor() {
    this.#agent = new https.Agent({
      cert: fs.readFileSync(
        path.join(
          __dirname,
          "..",
          "certs",
          "Swish_Merchant_TestCertificate_1234679304.pem"
        ),
        { encoding: "utf-8" }
      ),
      key: fs.readFileSync(
        path.join(
          __dirname,
          "..",
          "certs",
          "Swish_Merchant_TestCertificate_1234679304.key"
        ),
        { encoding: "utf-8" }
      ),
      ca: fs.readFileSync(
        path.join(__dirname, "..", "certs", "Swish_TLS_RootCA.pem"),
        { encoding: "utf-8" }
      ),
    });

    this.#client = axios.create({
      httpsAgent: this.#agent,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async #createPayment({ datas, instructionId }) {
    try {
      const response = await this.#client.put(
        `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionId}`,
        datas
      );

      return {
        success: true,
        message: "Sucesso ao gerar pagamento com Swish",
        response,
      };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao gerar pagamento com Swish",
        error,
      };
    }
  }

  async createNewPayment({ datas, instructionId }) {
    return this.#createPayment({ datas, instructionId });
  }
}

module.exports = { PaymentSwish };
