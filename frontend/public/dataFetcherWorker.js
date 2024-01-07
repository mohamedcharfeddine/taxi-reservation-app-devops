const ongoingFetches = {};

self.addEventListener("message", async (event) => {
  if (event.data.type === "abort") {
    const controller = ongoingFetches[event.data.taskId];
    if (controller) {
      controller.abort();
    }
  } else if (event.data.type === "fetch") {
    const controller = new AbortController();
    ongoingFetches[event.data.taskId] = controller;

    try {
      const response = await fetch(event.data.url, {
        signal: controller.signal,
      });
      const data = await response.json();
      self.postMessage({ success: true, data });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        self.postMessage({ success: false, error });
      }
    }

    delete ongoingFetches[event.data.taskId];
  }
});
