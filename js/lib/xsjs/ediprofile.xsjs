function saveenvprofile(profile) {
	var conn = $.hdb.getConnection();
	var output = JSON.stringify(profile);
	var fnCreateEdiProfile =
		conn.loadProcedure("ediasn.db.procedure::createediprof");
	var result = fnCreateEdiProfile(
		{
		IM_PROFILENAME   :profile.profilename,
		IM_SENDERQLF     :profile.senderqlf,
		IM_SENDERID      :profile.senderid,
		IM_RECIVERQLF    :profile.reciverqlf,
		IM_RECIVERID     :profile.reciverid,
		IM_VERISON       :profile.verison,
		IM_INTICNNUM     :profile.inticnnum,
		IM_IDICATOR      :profile.idicator,
		IM_ENVREF1       :profile.envref1,
		IM_EDICUSTNUM    :profile.edicustnum
	}
	);
	conn.commit();
	conn.close();
	if (result && result.EX_ERROR !== null) {
		return result.EX_ERROR;
	} else {
		return output;
	}

}

var profile = {
	profilename: $.request.parameters.get("profilename"),
	senderqlf: $.request.parameters.get("senderqlf"),
	senderid: $.request.parameters.get("senderid"),
	reciverqlf: $.request.parameters.get("reciverqlf"),
	reciverid: $.request.parameters.get("reciverid"),
	verison: $.request.parameters.get("verison"),
	inticnnum: $.request.parameters.get("inticnnum"),
	idicator: $.request.parameters.get("idicator"),
	envref1: $.request.parameters.get("envref1"),
	edicustnum: $.request.parameters.get("edicustnum")

};

// validate the inputs here!

var output = saveenvprofile(profile);
$.response.contentType = "application/json";
$.response.setBody(output);