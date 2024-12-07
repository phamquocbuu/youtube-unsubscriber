let index = 0;

const unsubscribe = () => {
  const gridContainer = document.getElementById("grid-container");
  if (!gridContainer) {
    console.log("Grid container not found.");
    clearInterval(interval);
    return;
  }

  const channels = gridContainer.getElementsByClassName("ytd-expanded-shelf-contents-renderer");

  if (index >= channels.length) {
    console.log("Unsubscribe process completed.");
    clearInterval(interval);
    return;
  }

  try {
    const unsubscribeButton = channels[index].querySelector("[aria-label^='Unsubscribe from']");
    if (unsubscribeButton) {
      unsubscribeButton.click();

      setTimeout(() => {
        const confirmButton = document.querySelector("#confirm-button yt-button-shape button");
        if (confirmButton) confirmButton.click();
      }, 500);
    }

    console.log(`Unsubscribed from channel ${index + 1}`);
  } catch (e) {
    console.error(`Error unsubscribing channel ${index + 1}:`, e);
  }

  index++;
};

const interval = setInterval(unsubscribe, 1000);
