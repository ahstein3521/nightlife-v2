
$(document).on("click",".rsvp-btn",function(){
	var t=$(this).parent().attr("id")
	s=parseInt($(this).prev().text())+1
	n=this;
	$.ajax({
		url:"/rsvp/"+t,
		type:"POST",
		success:function(t){
			console.log(t)
			$(n).prev().html("<strong>"+s+" Going</strong>")
			$(n).removeClass("rsvp-btn").addClass("cancel").attr("id",t).text("Cancel")}
		})
	})

$(document).on("click",".cancel",function(){
	var t=$(this).attr("id"),
		s=($(this).parent().attr("id"),
		parseInt($(this).prev().text())-1),
	n=this;
	$.ajax({
		url:"/rsvp/"+t,
		type:"DELETE",
		success:function(t){
			console.log(t),
			$(n).prev().html("<strong>"+s+" Going</strong>"),
			$(n).addClass("rsvp-btn").removeClass("cancel").text("RSVP")
		}
	})
});