# Hangboard Routines

You are a senior frontend engineer.

Your task is to build a small web application called **Hangboard Routines**.

The goal is to produce clean, maintainable code following Vue and TypeScript best practices. Prefer **KISS over over-engineering**, but keep code reasonably DRY.

Never use the `any` type.

Use **Vue 3 Composition API with `<script setup>`**.

---

## Tech Stack

Use the following stack:

* Vue 3
* TypeScript
* PrimeVue
* Vue Router 4
* Vite

Project structure should follow common Vue conventions.

Example structure:

src

* components
* pages
* router
* types
* services
* composables

Use a small **localStorage service** to isolate storage logic.

---

## Application Description

The application allows users to create and manage **hangboard training routines**.

Routines are stored in **local storage**.

Local storage key:

"my-hangboard-routines"

The stored value is a JSON array of routines.

---

## Data Model

Define the following TypeScript types.

```ts
export type Routine = {
  id: string
  name: string
  countdown: number
  blocks: RoutineBlock[]
}

export type RoutineBlock =
  | {
      type: "iteration"
      hang: number
      rest: number
    }
  | {
      type: "recovery"
      duration: number
    }
```

---

## Routing

Use **Vue Router** with these routes:

/ → redirect to /my-routines

/my-routines
Page name: My Routines

/new-routine
Page name: New Routine

/edit-routine/:id
Page name: Edit Routine

---

## Page: My Routines

Responsibilities:

* Load routines from local storage
* Display routines in a list
* Each routine shows:

  * name
  * edit button
  * delete button

Delete should remove the routine from local storage.

Edit navigates to:

/edit-routine/:id

If there are **no routines**, display a button:

"Create New Routine"

This navigates to:

/new-routine

Use PrimeVue components such as:

* Card
* Button

---

## Page: New Routine

Allows the user to create a routine.

Inputs:

Routine name (InputText)

Countdown
Radio buttons with values:

10,20,30,40,50,60

A routine consists of an **ordered list of blocks**.

Two block types exist.

Iteration:

* hang (radio: 10,20,30,40,50,60)
* rest (radio: 10,20,30,40,50,60)

Recovery:

* duration (radio: 10,20,30,40,50,60)

The user can add blocks:

* Add Iteration
* Add Recovery

Use PrimeVue SelectButton components.

---

## Default Values

When opening the page, prefill:

name: "Name of new routine"

countdown: 10

blocks:

iteration
hang: 10
rest: 50

recovery
duration: 60

---

## Save Routine

When saving:

* generate a unique id
* add routine to local storage

After saving:

redirect to /my-routines

---

## Page: Edit Routine

Same UI as **New Routine**.

Differences:

* Load routine by id from local storage
* Prefill fields
* Saving updates the existing routine

---

## UI Guidelines

Use PrimeVue components where possible:

InputText
SelectButton
Button
Card
Divider

Keep styling minimal.

Focus on functionality.

---

## Code Guidelines

* Strict TypeScript
* No `any`
* Composition API
* Small reusable components where appropriate
* Avoid unnecessary abstractions
* Keep components readable

---

## Implementation Steps

1. Create project structure
2. Configure PrimeVue
3. Configure router
4. Implement local storage service
5. Implement My Routines page
6. Implement New Routine page
7. Implement Edit Routine page
8. Create reusable components for iteration and recovery blocks
9. Test storing, editing and deleting routines
