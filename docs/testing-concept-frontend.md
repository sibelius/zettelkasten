---
id: testing-concept-fronted
title: Testing Concept Frontend
tags:
  - testing
  - concept
  - frontend
---

You first need to undestand the concept of frontend tests.

You should not test the implementation but the behavior

You test like the end user

For instance, imagine a login screen with email and password inputs and a submit button

The test should input the email and the password, then click in the submit button.

You should assert the API was called with the inputted data.

When using testing library you test against DOM

code:

```jsx
const emailInput = getByTestId(emailTestId);
fireEvent.onChange(emailInput, { target: { value: 'email@email.com.br' }})

const passwordInput = getByTestId(passwordTestId);
fireEvent.onChange(passwordInput, { target: { value: 'pwd' }})

const submitButton = getByText('Login').closest('button');
fireEvent.click(submitButton);

// assert api was called properly
```