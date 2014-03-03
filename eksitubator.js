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
});