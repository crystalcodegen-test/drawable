var Api = {
	ENDPOINT : 'http://api.drawabl.es:4567/v1.0',
	RESOURCE : [
		'documents',
		'layers',
		'objects'
	],
	URL : new Object,
	init : function()
	{
		/* add resources to Api.URL constant */
		var resource_name;
		for (var i in Api.RESOURCE) {
			/* capitalize resource name */
			resource_name = Api.RESOURCE[i].substr(0, 1).toUpperCase() + Api.RESOURCE[i].substr(1);
			/* add resource to Api.URL constant */
			Api.URL[resource_name] = Api.ENDPOINT + '/' + Api.RESOURCE[i];
		}
	}
};