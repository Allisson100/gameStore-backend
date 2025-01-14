const { PaymentSwish } = require("../classes/paymentSwish");
const { v4: uuidv4 } = require("uuid");

exports.createPayment = async (req, res) => {
  try {
    const datas = req.body;

    // Validar dados

    const newSwishPayment = new PaymentSwish();
    const getNewSwishPayment = await newSwishPayment.createNewPayment({
      datas: {
        payeePaymentReference: "0123456789",
        callbackUrl: "http://127.0.0.1:3031",
        payeeAlias: "1234679304",
        currency: "SEK",
        payerAlias: "4671234768",
        amount: "100",
        message: "Kingston USB Flash Drive 8 GB",
        callbackIdentifier: "11A86BE70EA346E4B1C39C874173F478",
      },
      instructionId: uuidv4(),
    });

    if (!getNewSwishPayment?.success)
      throw new Error(getNewSwishPayment?.message);

    res.status(200).json({
      success: true,
      message: getNewSwishPayment?.message,
      response: getNewSwishPayment?.response,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};
