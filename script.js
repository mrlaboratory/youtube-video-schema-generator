
 $(document).ready(function() {
    $("#generate-button").click(function() {
      var videoLink = $("#video-link").val();
      generateVideoSchema(videoLink);
    });
  });
  var mrApi = "AIzaSyDSwN5XQQfJvYhY4iLMf3DZmUr6MdCjawg";

  function generateVideoSchema(link) {
    // Extract the video id from the link
    var videoId = link.split('v=')[1];


    var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + mrApi;
    // fetch video information from YouTube
    
    $.getJSON(url, function(data) {
      var title = data.items[0].snippet.title;
      var description = data.items[0].snippet.description;
      var thumbnail = data.items[0].snippet.thumbnails.default.url;
      var published = data.items[0].snippet.publishedAt;
      var schema = `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "${title}",
        "description": "${description}",
        "thumbnailUrl": "${thumbnail}",
        "uploadDate": "${published}",
        "contentUrl": "${link}",
      }
      </script>
    `;
    
      $("head").append(schema);
    });
  }

