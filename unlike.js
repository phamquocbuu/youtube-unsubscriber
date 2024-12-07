let index = 0;

const unlikeVideos = () => {
  const videoList = document.querySelectorAll(
    "ytd-playlist-video-renderer.style-scope.ytd-playlist-video-list-renderer"
  );

  if (index === 0) {
    console.log(`Total videos to unlike: ${videoList.length}`);
  }

  if (index >= videoList.length) {
    console.log("Unlike process completed.");
    clearInterval(interval);
    return;
  }

  try {
    const video = videoList[index];
    if (video) {
      // Click nút menu hành động
      const actionMenuButton = video.querySelector("#button[aria-label='Action menu']");
      if (actionMenuButton) {
        actionMenuButton.click();
        console.log(`Opened action menu for video ${index + 1}`);

        setTimeout(() => {
          // Tìm nút "Remove from Liked videos" từ menu trong phạm vi video
          const menuItems = document.querySelectorAll('ytd-popup-container ytd-menu-service-item-renderer');

          let unlikeOption = null;
          menuItems.forEach((item) => {
            const textElement = item.querySelector(
              "yt-formatted-string.style-scope.ytd-menu-service-item-renderer"
            );
            if (textElement && textElement.innerText === "Remove from Liked videos") {
              unlikeOption = item;
            }
          });

          if (unlikeOption) {
            unlikeOption.click();
            console.log(`Unliked video ${index + 1}`);
          } else {
            console.log(`Unlike option not found for video ${index + 1}`);
          }
        }, 1000); // Đợi menu load
      } else {
        console.log(`Action menu button not found for video ${index + 1}`);
      }
    }
  } catch (error) {
    console.error(`Error processing video ${index + 1}:`, error);
  }

  index++;
};

const interval = setInterval(unlikeVideos, 3000);
