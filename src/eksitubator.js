chrome.extension.sendRequest('show');

$(document).ready(function () {

    var search_input = $("#title").text();
    var keyword = encodeURIComponent(search_input);
    // Youtube API 
    var yt_url = 'https://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=1&v=2&alt=jsonc';

    $.ajax({
        type: "GET",
        url: yt_url,
        datatype: "json",
        success: function (response) {
            if (response.data.items) {
                $.each(response.data.items, function (i, data) {
                    var video_id = data.id;
                    var video_title = data.title;
                    var video_viewCount = data.viewCount;
                    // IFRAME Embed for YouTube
                    var video_frame = "<iframe src='https://www.youtube.com/embed/" + video_id + "' width='100%' height='350'  frameborder='0' type='text/html'></iframe>";

                    var final = "<div>" + video_frame + "</div>";

                    if ($("#videos")) $("#videos").html(final); // Result
                    if ($("#video")) $("#video").html(final); // Result

                });
            } else {
                $("#videos").html("<div id='no'>Bu sefer video çıkmadı.</div>");
            }
        }
    });
   
   // youtube links opening inline
$("div.content a.url").click(function(e){
    
    var regex = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
    var youtubeurl = $(this).attr('href');
    var regexyoutubeurl = youtubeurl.match(regex);
    if (regexyoutubeurl) {
        e.preventDefault();
        $(this).append("<p><iframe width=\"420\" height=\"315\" src=\"http://www.youtube.com/embed/"+regexyoutubeurl[2]+"\" frameborder=\"0\" allowfullscreen></iframe></p>");
    }
});

$("#topic-research-menu ul").append('<li><a href="https://www.youtube.com/results?search_query=' + keyword +'"><span style="vertical-align: middle;display: inline-block;min-width: 16px;min-height: 16px;"><img src="https://youtube.com/favicon.ico"/></span> youtube</a></li>');

});