// Registration Form UI
// import { Container, Segment, Header, Form } from "semantic-ui-react";
// function App() {
//   return (
//     <Container>
//       <Segment>
//         <Header as="h1" textAlign="center">
//           Registration Form
//         </Header>
//         <Form>
//           <Form.Group widths="equal">
//             <Form.Input
//               label="First Name"
//               placeholder="Enter Your First Name"
//             />
//             <Form.Input label="Last Name" placeholder="Enter Your Last Name" />
//           </Form.Group>
//           <Form.Group inline>
//             <label>Gender</label>
//             <Form.Radio label="Male" value="male" name="gender" />
//             <Form.Radio label="Female" value="female" name="gender" />
//           </Form.Group>
//           <Form.Group widths="equal">
//             <Form.Input type="date" label="Birth Date"></Form.Input>
//             <Form.Input type="number" label="Phone Number"></Form.Input>
//           </Form.Group>
//           <Form.Input label="Email" type="email" />
//           <Form.Group widths="equal">
//             <Form.Input label="Password" />
//             <Form.Input label="Confirm Password" />
//           </Form.Group>
//           <Form.TextArea label="Address" />
//         </Form>
//       </Segment>
//     </Container>
//   );
// }
// export default App;

import { useEffect } from "react";
import { Container, Segment, Header, Form, Label } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const countryOptions = [
  { key: "in", value: "in", text: "India" },
  { key: "ca", value: "ca", text: "Canada" },
  { key: "uk", value: "uk", text: "U.K" },
  { key: "au", value: "au", text: "Australia" },
  { key: "bd", value: "bd", text: "Bangladesh" },
  { key: "by", value: "by", text: "Belarus" },
  { key: "sl", value: "sl", text: "Srilanka" },
];

function App() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const cutoffDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18); // go back by 18 years

  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(10).required().messages({
      "string.empty": "First Name should not be an empty",
      // "any.required": "First Name is required",
      "string.min": "First Name must contain atleast 2 character",
      "string.max": "First Name not must contain greater than 10 character",
    }),
    lastName: Joi.string().trim().min(2).max(10).required().messages({
      "string.empty": "Last Name should not be an empty",
      // "any.required": "Last Name is required",
      "string.min": "Last Name must contain atleast 2 character",
      "string.max": "Last Name not contain greater than 10 character",
    }),
    gender: Joi.string().required().messages({
      "string.empty": "Gender should not be an empty",
      // "any.required": "Gender is required",
    }),
    birthDate: Joi.date().max(cutoffDate).required().messages({
      "date.base": "Birth Date should not be an empty",
      "any.required": "Birthdate Date is required",
      "date.max": "Age must be longer than 18 years.",
    }),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": "Phone Number should not be an empty",
        "string.length": "Phone Number length must be 10 character long",
        "any.required": "Phone Number is required",
      }),
    country: Joi.string().required().messages({
      "string.empty": "Country should not be an empty",
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.empty": "Email should not be an empty",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.empty": "Password should not be an empty",
        "string.pattern.base":
          "Password is between 3-30 characteres and must contain a-z, A-Z and 0-9",
        "any.required": "Password is required",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.empty": "Confirm Password should not be an empty",
        "any.required": "Confirm Password is required",
        "any.only": "Confirm Password shold be matched with Password",
      }),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: initialFormData,
    resolver: joiResolver(schema),
  });
  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      alert("data cubmitted Successfully");
      reset(initialFormData);
    }
  }, [isSubmitSuccessful]);

  return (
    <Container>
      <Segment>
        <Header as="h1" textAlign="center">
          Registration Form
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Form.Input
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  name={field.name}
                  label="First Name"
                  placeholder="Enter First Name"
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Form.Input
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  name={field.name}
                  label="Last Name"
                  placeholder="Enter Last Name"
                  error={errors.lastName?.message}
                />
              )}
            />
          </Form.Group>
          <Form.Field>
            <Form.Group inline>
              <label>Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Radio
                      onChange={(e, { value }) => field.onChange(value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      label="Male"
                      value="male"
                      checked={field.value === "male"}
                    />
                    <Form.Radio
                      onChange={(e, { value }) => field.onChange(value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      label="Female"
                      value="female"
                      checked={field.value === "female"}
                    />
                  </>
                )}
              />
            </Form.Group>
            {errors.gender && (
              <Label pointing basic className="prompt label">
                {errors.gender.message}
              </Label>
            )}
          </Form.Field>
          <Form.Group widths="equal">
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <Form.Input
                  type="date"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  value={field.value}
                  label="Birth Date"
                  error={errors.birthDate?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Form.Input
                  type="number"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  value={field.value}
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </Form.Group>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Form.Select
                onChange={(e, { value }) => field.onChange(value)}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="Select Country"
                label="Country"
                options={countryOptions}
                error={errors.country?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Input
                type="email"
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                value={field.value}
                placeholder="Enter Email"
                label="Email"
                error={errors.email?.message}
              />
            )}
          />
          <Form.Group widths="equal">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Input
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  value={field.value}
                  placeholder="Enter Password"
                  label="Password"
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Form.Input
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  value={field.value}
                  placeholder="Enter Confirm Password"
                  label="Confirm Password"
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </Form.Group>
          <Form.Button primary>Submit</Form.Button>
        </Form>
      </Segment>
    </Container>
  );
}
export default App;
