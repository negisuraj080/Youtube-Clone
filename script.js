const videoCardContainer = document.querySelector(".video-wrapper");

let api_key = "AIzaSyA2yST33tscvE0innZP5p0MqLwPx0b1B8o";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
    video_http +
      new URLSearchParams({
        part: "snippet, contentDetails,statistics,player",
        chart: "mostPopular",
        maxResults: 20,
        regionCode: "IN",
        key: api_key,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
    })
    .catch((err) => console.log(err));
  
  const getChannelIcon = (video_data) => {
    fetch(
      channel_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: video_data.snippet.channelId,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        const channelThumbnail =
          data.items[0].snippet.thumbnails.default.url;
          //console.log(data);
        makeVideoCard(video_data, channelThumbnail);
      });
  };

  const playVideo = (embedHTML) => {
    console.log(embedHTML);
    sessionStorage.setItem("videoEmbedHtml",embedHTML);

    window.location.href = "video-page.html"
     
  }
  
  const makeVideoCard = (data, channelThumbnail) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videoCard.innerHTML = `
      <div class="video-content">
        <img src="${data.snippet.thumbnails.high.url}" alt="thumbnail" class="thumbnail">
      </div>
      <div class="video-details">
        <div class="channel-logo">
          <img src="${channelThumbnail}" alt="" class="channel-icon">
        </div>
        <div class="detail">
          <h3 class="title">${data.snippet.title}</h3>
          <div class="channel-name">${data.snippet.channelTitle}</div>
        </div>
      </div>
    `;

    videoCard.addEventListener("click",() => {
        console.log(data);
        playVideo(data.player.embedHtml);
    })

    videoCardContainer.appendChild(videoCard);
  };


  
  