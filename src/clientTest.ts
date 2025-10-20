import soap from "soap";
const url = "http://localhost:3000/ATMService?wsdl";

soap.createClient(url, function (err, client) {
  if (err) {
    console.error(err);
  } else {
    client.ViewTransactions({ accountId: 1 }, function (err: any, result: any) {
      if (err) {
        console.error(err);
      } else {
        console.log(result.data);
      }
    });
  }
});
