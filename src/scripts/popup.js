global_url="";

function wbm_url(url){
    if(url.includes('web.archive.org')){
        return true;
    }else{
        return false;
    }
}

function remove_port(url){
    if(url.substr(-4)==':80/'){
        url=url.substring(0,url.length-4);
    }
    return url;
}

function remove_wbm(url){
    var pos=url.indexOf('/http');
    var new_url=url.substring(pos+1);
    new_url=remove_port(new_url);
    return new_url;
}

function alexa_url(url){
    if(url.includes('www.alexa.com')){
        return true;
    }else{
        return false;
    }
}

function whois_url(url){
    if(url.includes('www.whois.com')){
        return true;
    }else{
        return false;
    }
}

function remove_alexa(url){
    var pos=url.indexOf('/siteinfo/');
    var new_url=url.substring(pos+10);
    new_url=remove_port(new_url);
    return new_url;
}

function remove_whois(url){
    var pos=url.indexOf('/whois/');
    var new_url=url.substring(pos+7);
    new_url=remove_port(new_url);
    return new_url;
}

function save_now_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/save/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, page_url:url , method:'save' }).then(handleResponse, handleError);;	
}

function recent_capture_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/web/2/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url,page_url:url, method:'recent' }, function(response) {
	});
}

function first_capture_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/web/0/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url,page_url:url, method:'first' }, function(response) {
	});
}

function view_all_function(){
	var pattern = /https:\/\/web\.archive\.org\/web\/(.+?)\//g;
	url = document.location.href.replace(pattern, "");
	open_url = "https://web.archive.org/web/*/"+encodeURI(url);
	document.location.href = open_url;
}

function get_url(){
    chrome.tabs.query({active: true,currentWindow:true},function(tabs){
        global_url=tabs[0].url;
    });
}

function search_term(){
    var term="";
    return(term); 
}

function social_share(eventObj){
    var parent=eventObj.target.parentNode;
    var id=parent.getAttribute('id');
        if(search_term()==""){
            var url=global_url;
        }else{
            var url=search_term();
        }
        if(alexa_url(url)){
            url=remove_alexa(url);
        }else if(whois_url(url)){
            url=remove_whois(url);
        }
        
        var open_url="";
        if(id.includes('fb')){
            open_url="https://www.facebook.com/sharer/sharer.php?u="+url;
        }else if(id.includes('twit')){
            open_url="https://twitter.com/home?status="+url;
        }else if(id.includes('gplus')){
            open_url="https://plus.google.com/share?url="+url;
        }else if(id.includes('linkedin')){
            open_url="https://www.linkedin.com/shareArticle?url="+url;
        }
        window.open(open_url, 'newwindow', 'width=800, height=280,left=0');
        
        
    
    
}

function alexa_statistics_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    var open_url="http://www.alexa.com/siteinfo/"+url;
    window.open(open_url, 'newwindow', 'width=800, height=280,left=0');
}

function whois_statistics_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    var open_url="https://www.whois.com/whois/"+url;
    window.open(open_url, 'newwindow', 'width=800, height=280,left=0');
}

function search_tweet_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    if(url.includes('http://')){
        url=url.substring(7);
    }else if(url.includes('https://')){
        url=url.substring(8);
    }
    if(url.slice(-1)=='/') url=url.substring(0,url.length-1);
    var open_url="https://twitter.com/search?q="+url;
    window.open(open_url, 'newwindow', 'width=800, height=280,left=0');    
}

window.onload=get_url;
document.getElementById('save_now').onclick = save_now_function;
document.getElementById('recent_capture').onclick = recent_capture_function;
document.getElementById('first_capture').onclick = first_capture_function;
document.getElementById('fb_share').onclick =social_share;
document.getElementById('twit_share').onclick =social_share;
document.getElementById('gplus_share').onclick =social_share;
document.getElementById('linkedin_share').onclick =social_share;
document.getElementById('alexa_statistics').onclick =alexa_statistics_function;
document.getElementById('whois_statistics').onclick =whois_statistics_function;
document.getElementById('search_tweet').onclick =search_tweet_function;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.message=='urlnotfound'){
  	alert("URL not found in wayback archives!");
  }
});