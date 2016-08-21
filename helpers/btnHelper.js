module.exports=function(data,user){

	if(!data.results||!user) return;
	data.results.forEach(function(result,i){
		result.user=user;
	
			var list=result.attending.filter(function(v){
				return (v.user.username==user.username)
			})
			
			if(list.length>0){
				result.RSVP=list[0];
			}
	})
}
