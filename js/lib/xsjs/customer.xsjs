function saveCustomer(customer) {
var conn = $.hdb.getConnection();
var output = JSON.stringify(customer);
var fnCreateCustomer=
conn.loadProcedure("ediasn.db.procedure::createcustomer");
var result=fnCreateCustomer(
{
IM_CUSTNUMN :customer.custnumn,
IM_NAME     :customer.name,
IM_STEERT   :customer.steert,
IM_CITY     :customer.city,
IM_POSTAL   :customer.postal,
IM_REGION   :customer.region,
IM_COUNTRY  :customer.country,
IM_CUSTREF1 :customer.custref1,
IM_CUSTREF2 :customer.custref2
}
);
conn.commit();
conn.close();
if (result && result.EX_ERROR !== null) { return result.EX_ERROR;}
else { return output; }

}


var customer = {
  custnumn: $.request.parameters.get("custnumn"),
  name: $.request.parameters.get("name"),
  street: $.request.parameters.get("steert"),
  city: $.request.parameters.get("city"),
  postal: $.request.parameters.get("postal"),
  region: $.request.parameters.get("region"),
  country: $.request.parameters.get("country"),
  custref1: $.request.parameters.get("custref1"),
  custref2: $.request.parameters.get("custref2")
 

};

// validate the inputs here!

var output = saveCustomer(customer);

$.response.contentType = "application/json";

$.response.setBody(output);