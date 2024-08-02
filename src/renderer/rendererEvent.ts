import { renderEventForm } from "./pages/event/event";
import { Event } from "./interface/event";

window.electron.receive(
  "open-event-window",
  (data: { date?: string; event?: Event }) => {
    if (data.event) {
      console.log("edit", data.event);
      renderEventForm("edit", undefined, data.event);
    } else if (data.date) {
      renderEventForm("add", data.date);
      console.log("add");
    }
  }
);
