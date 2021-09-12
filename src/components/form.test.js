import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import App from "./App";
import Form from "./Form";

describe("form", () => {
  it("should render the email field", () => {
    render(<Form />);
    expect(
      screen.getByPlaceholderText("Email", { name: "email" })
    ).toBeInTheDocument();
  });

  it("should render the name field", () => {
    render(<Form />);
    expect(
      screen.getByPlaceholderText("Name", { name: "name" })
    ).toBeInTheDocument();
  });

  it("should test the age field", () => {
    render(<Form />);
    expect(
      screen.getByPlaceholderText("Age", { name: "age" })
    ).toBeInTheDocument();
  });
});
// testing for name field
describe("validate name input", () => {
  it("should pass validation when input is valid", async () => {
    const form = render(<Form />);
    const nameField = await screen.findByPlaceholderText("Name");
    userEvent.type(nameField, "Supriya");
    expect(screen.getByPlaceholderText("Name")).toHaveValue("Supriya");
    expect(
      form.container.querySelector(".error-message")
    ).not.toBeInTheDocument();
  });

  it("should show error when name field is empty", async () => {
    const form = render(<Form />);

    const nameField = await screen.findByPlaceholderText("Name");
    userEvent.type(nameField, "ab"); // setting the value first so on change event can fire
    // Clicking on this component makes it active
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "" },
    });

    expect(form.container.querySelector(".error-message")).toBeInTheDocument();
  });
});

//testing for email field
describe("test email input", () => {
  it("should not show error message when email is valid", async () => {
    const form = render(<Form />);
    const emailField = await screen.findByPlaceholderText("Email");
    userEvent.type(emailField, "abc@gmail.com");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("abc@gmail.com");
    expect(
      form.container.querySelector(".error-message")
    ).not.toBeInTheDocument();
  });

  it("should show error when email field is empty", async () => {
    const form = render(<Form />);

    const emailField = await screen.findByPlaceholderText("Email");
    userEvent.type(emailField, "ab");
    // Clicking on this component makes it active
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "" },
    });

    expect(form.container.querySelector(".error-message")).toBeInTheDocument();
  });
});

// testing for age
describe("test age field", () => {
  it("should not show error when age is between 18-99", async () => {
    const form = render(<Form />);

    const ageField = await screen.findByPlaceholderText("Age");
    userEvent.type(ageField, "77");
    expect(
      form.container.querySelector(".error-message")
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "" },
    });
    userEvent.type(ageField, "18");
    expect(
      form.container.querySelector(".error-message")
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "" },
    });
    userEvent.type(ageField, "99");
    expect(
      form.container.querySelector(".error-message")
    ).not.toBeInTheDocument();
  });

  it("should show error when age field empty", async () => {
    const form = render(<Form />);

    const ageField = await screen.findByPlaceholderText("Age");
    userEvent.type(ageField, "22");
    expect(screen.getByPlaceholderText("Age")).toHaveValue(22);
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "" },
    });
    expect(form.container.querySelector(".error-message")).toBeInTheDocument();
  });

  it("should show error when age is less than 18", async () => {
    const form = render(<Form />);

    const ageField = await screen.findByPlaceholderText("Age");
    userEvent.type(ageField, "12");

    expect(form.container.querySelector(".error-message")).toBeInTheDocument();
  });

  it("should show error when age is more than 99", async () => {
    const form = render(<Form />);

    const ageField = await screen.findByPlaceholderText("Age");
    userEvent.type(ageField, "100");

    expect(form.container.querySelector(".error-message")).toBeInTheDocument();
  });
});

describe("test form validation during submission", () => {
  it("should call parent callback when form validation succeeds", async () => {
    const onSubmit = jest.fn();
    const form = render(<Form onSubmit={onSubmit} />);

    const nameField = await screen.findByPlaceholderText("Name");
    userEvent.type(nameField, "Supriya");

    const ageField = await screen.findByPlaceholderText("Age");
    userEvent.type(ageField, "22");

    const emailField = await screen.findByPlaceholderText("Email");
    userEvent.type(emailField, "suppichala@suppichala.com");

    const submitButton = await screen.findByRole("button");
    userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      userName: "Supriya",
      userAge: "22",
      userEmail: "suppichala@suppichala.com",
    });
  });
  it.todo(
    "It should show error message and prevent form submission when name field is missing"
  );
  it.todo(
    "It should show error message and prevent form submission when age field is missing"
  );
  it.todo(
    "It should show error message and prevent form submission when age < 18"
  );
  it.todo(
    "It should show error message and prevent form submission when age > 99"
  );
  it.todo(
    "It should show error message and prevent form submission when email field is missing"
  );
});

//Note:
//userEvent -- event trigger by user eg: MouseEvent, Click, type

//https://testing-library.com/docs/example-react-formik
