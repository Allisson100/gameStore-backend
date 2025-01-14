const { PaymentML, PreferenceML } = require("../classes/paymentML");

exports.createNewPayment = async (req, res) => {
  try {
    const datas = req.body;

    // Validar dados

    const newPayment = new PaymentML();
    let getNewPayment = null;

    switch (datas?.selectedPaymentMethod) {
      case "bank_transfer":
        getNewPayment = await newPayment.processPayment({
          transaction_amount: Number(datas?.formData?.transaction_amount),
          description: "Compra de jogos",
          payment_method_id: String(datas?.formData?.payment_method_id),
          payer: {
            email: datas?.formData?.payer?.email,
          },
        });
        break;

      case "credit_card":
        getNewPayment = await newPayment.processPayment({
          transaction_amount: Number(datas?.formData?.transaction_amount),
          token: String(datas?.formData?.token),
          description: "Compra de jogos",
          installments: Number(datas?.formData?.installments),
          payment_method_id: String(datas?.formData?.payment_method_id),
          issuer_id: Number(datas?.formData?.issuer_id),
          payer: {
            email: datas?.formData?.payer?.email,
            identification: {
              number: String(datas?.formData?.payer?.identification?.number),
              type: "CPF",
            },
          },
        });
        break;

      default:
        getNewPayment = {
          success: false,
          message: "Método de pagamento inválido",
          response: null,
          error: null,
        };
        break;
    }

    if (!getNewPayment?.success) throw new Error(getNewPayment?.message);

    res.status(200).json({
      success: true,
      message: getNewPayment?.message,
      response: getNewPayment?.response,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

exports.createNewPreference = async (req, res) => {
  try {
    const datas = req.body;

    // Validar dados

    const newPreference = new PreferenceML();
    const getNewPreference = await newPreference.processPreference({
      cart: datas?.cart,
    });

    if (!getNewPreference?.success) throw new Error(getNewPreference?.message);

    res.status(200).json({
      success: true,
      message: getNewPreference?.message,
      response: getNewPreference?.response,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};
