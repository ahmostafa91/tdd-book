import React from "react";
import reactDom from "react-dom/client";
import { AppointmentsDayView } from "./src/AppointmentsDayView";
import { sampleAppointments } from "./src/utils/sampleData";

const container = document.getElementById("root");

reactDom.createRoot(container).render(<AppointmentsDayView appointments={sampleAppointments} />)