# Interactive Form
 FSJS-3

## Real-Time Validation

To enhance the user experience, the form implements real-time validation for input fields.

As the user types, the input is continuously validated. If the input is invalid, an error message is displayed and the field is visually marked. Once the input becomes valid, the error message disappears, and the field is styled accordingly.

This is achieved by using a keyup event listener on each input field, which calls the attachValidation function. The function checks the input’s validity based on custom validation functions (e.g., isValidEmail, isValidName) and displays error messages when the input is invalid. The error messages are customized for each input field and guide the user towards correcting their input.

For example, if the input is empty, the error message will indicate that the field cannot be blank. If the input is invalid (e.g., an email with incorrect formatting), a more specific error message will be shown.

The activities section validates user input in real-time to ensure at least one activity is selected:
 - Hint Message: If no activity is selected, a hint message is shown to inform the user.
 - Dynamic Feedback: The message disappears automatically when at least one activity is selected.


## Conditional Error Messages

The form fields feature conditional error messages that provide detailed feedback based on the specific issue with the input.

If the field is left empty, the error message reads: "The input (name,email, card details) field cannot be left blank."

If the input is entered but incorrectly formatted, the error message changes to something like: "Input must be in a valid format (e.g., name@domain.com)."

Each field has a unique set of error messages, ensuring that users receive relevant feedback based on the type of validation failure. For example, the name field will display a message indicating that the name cannot be blank or must only contain letters and spaces, while the email field will show a message that guides the user to enter a valid email address.