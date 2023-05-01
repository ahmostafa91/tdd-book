import React from "react";
import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  const appointmentTable = () => element("#appointmentView > table");

  it("render the table", () => {
    const customer = { firstName: "Ashley" };

    const component = <Appointment customer={customer} />;

    render(component);

    expect(appointmentTable()).not.toBeNull();
  });

  // it.skip
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Jordan");
  });

  it("renders customer lastName", () => {
    const customer = { lastName: "sam" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("sam");
  });

  it("renders customer phoneNumber", () => {
    const customer = {phoneNumber: "123456789"}

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("123456789");
  });

  it("renders customer stylist", () => {
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Sam"
      />
    );

    expect(appointmentTable()).toContainText("Sam");
  });

  it("renders customer services", () => {
    render(
      <Appointment
        customer={blankCustomer}
        service="Cut"
      />
    );

    expect(appointmentTable()).toContainText("Cut");
  });

  it("renders customer notes", () => {
    render(
      <Appointment
        customer={blankCustomer}
        notes="test note"
      />
    );

    expect(appointmentTable()).toContainText("test note");
  });

  it("renders h3 element", () => {
    render(
      <Appointment
        customer={blankCustomer}
      />
    );

    expect(element("h3")).not.toBeNull();
  });

  it("renders the time as the heading", () => {
    const today = new Date();
    const timestamp = today.setHours(9, 0, 0);
    render(
      <Appointment
        customer={blankCustomer}
        startsAt={timestamp}
      />
    );
    expect(element("h3")).toContainText(
      "Today’s appointment at 09:00"
    );
  });
  
});

describe("AppointmentsDayView", () => {
  const today = new Date();

  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),

      customer: { firstName: "Ashley" },
    },

    {
      startsAt: today.setHours(13, 0),

      customer: { firstName: "Jordan" },
    },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements("button")[1];

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = elements("ol > li");

    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const childrens = elements("li");

    expect(textOf(childrens)).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const buttons = elements("li > button");

    expect(buttons).toHaveLength(2);

    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    click(secondButton());

    expect(document.body.textContent).toContain("Jordan");
  });

  it("adds toggled class to button when selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    click(secondButton());
    expect(secondButton()).toHaveClass("toggled")
  });

  it("does not add toggled class if button is not selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    
    expect(secondButton()).not.toHaveClass("toggled");
  });
});
