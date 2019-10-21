const fetch2 = require("node-fetch");
fetch2


for (let index = 0; index < 10000; index++) {

	fetch2('http://localhost:3000/?' + 'ApiCallId=' + index)
	.then((response) => {console.log(response.text());});

	if(index % 10) {
		(async()=>{
			await new Promise((resolve)=>setTimeout(()=>resolve(),500));
		})();
	}
	
}