const functions = require("firebase-functions");

const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // or any other port you prefer
app.use(cors());
app.use(bodyParser.text({type:"*/*"}));
// Set up your routes here
app.post("/products", async (req, res) => {
  try {
    // console.log(req.body);
    //       const data = 'callCount=1
    // page=/siopiweb-web/simulaOperacaoInternet.do?method=enquadrarProdutos
    // httpSessionId="fCttkEH3Suzw0JoKx8x-Jwr4.habitacao_brnpapllx016:siopi-web-prd-node02_lx016"
    // scriptSessionId=B1644C926B0866432E15788D679323F0753
    // c0-scriptName=SIOPIAjaxFrontController
    // c0-methodName=callActionForwardMethodDiv
    // c0-id=0
    // c0-param0=string:%2FsimulaOperacaoInternet
    // c0-param1=string:simularOperacaoImobiliariaInternet
    // c0-param2=string:valorImovel%3D800.000%2C00%3ArendaFamiliarBruta%3D10.000%2C00%3AtipoImovel%3D1%3AimovelCidade%3D%3AvaContaFgts%3D%3AgrupoTipoFinanciamento%3D1%3AdataNascimento%3D01%2F12%2F1975%3Auf%3DSP%3Acidade%3D9133%3AnuItemProduto%3D100501102%3AnuVersao%3D7%3AvalorReforma%3D%3AcodigoSeguradoraSelecionada%3Dundefined%3AnomeSeguradora%3Dundefined%3AdataBeneficioFGTS%3D%3AbeneficiadoFGTS%3DF%3AcodContextoCredito%3D1%3AcomplementouDadosSubsidio%3Dtrue%3Apessoa%3DF%3Aconvenio%3D%3AnuEmpresa%3D%3AnuSeqPropostaInternet%3D%3ApermiteDetalhamento%3DS%3AcodSistemaAmortizacaoAlterado%3D32%40SAC%20%2F%20TR%3AnuCpfCnpjInteressado%3D17605534841%3AicFatorSocial%3D%3AicPossuiRelacionamentoCAIXA%3D%3AicServidorPublico%3D%3AicContaSalarioCAIXA%3D%3AicPortabilidadeCreditoImobiliario%3D%3AvaNuApf%3D%3AnuTelefoneCelular%3D%3AicArmazenamentoDadoCliente%3D%3AvaIcTaxaCustomizada%3D%3Aprazo%3D360%3ArecursosProprios%3D522.966%2C30
    // c0-param3=string:resultadoSimulacao
    //       batchId = 2
    //       ';

    const response = await axios.post(
      "https://habitacao.caixa.gov.br/siopiweb-web/dwr/call/plaincall/SIOPIAjaxFrontController.callActionForwardMethodDiv.dwr",
      req.body
    );

    const products = response.data;
    console.log(products);
    res.send(products);
    // res.header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Accept").json({
    //   message: 'responseMessage',
    //   someData: 123,
    // })
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving products");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

exports.app = functions.https.onRequest(app);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
