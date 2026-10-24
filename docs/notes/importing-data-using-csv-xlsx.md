---
id: importing-data-using-csv-xlsx
title: Importing data using csv / xlsx
tags:
  - software
  - data
---

#blog #substack #twitter

What can go wrong when importing data using .csv or .xlsx files?

**Dates/Times**

csv/xlsx files does not ensure the user will use the data formatting that you asked them for.

You can use the date format in xlsx, but user can modify the column to remove this formatting, or pasting the wrong date format altogether.

You can also handle dates as string or let your xlsx parser to try to parse to you.

The most common problem is that some countries using dd/mm/yyyy and other uses mm/dd/yyyy. You can use some Heuristic to try to correct parse them, as some dates only works in a given format. You could also use the date format of the locale of the user, but it won't tell much about the language of the file the user used to edit the import data.

You also need to handle timezone possible issues as always.

**Header/Columns**

Users can modify the header of your import file, so your importing strategy will fail.

You could enforce the column number, but users will change this order

You could enforce the column header label, but users will change them

You could try to match them using a Heuristic that this will also fail

You can let user tells you what is inside each column

**Booleans**

You can predefined a set of strings to represent truth and false values

It can be in english and also in the language of your users.

You should also lowercase them to make comparison more stable, as users can behave and act differently.

**Conditional Fields**

One column/field can affect other field.

One field can make another field required

One field can be exclusive against other (you can't have both)

**Validations**

Each column can have a data type (string, number, date, ID, boolean and more).

Your validations can be global or local

If you are importing users, you need a global validation to make sure they does not have conflicts primary keys.

You need local validation per row, to make sure all required columns are defined.

You also need to make sure all columns have the proper type.

If you have an ID reference to some database data, you need to make sure the ID is valid, and it is stored in the database.

**Error Handling**

Instead of a stack trace, we need to provide a file trace of error that happened during the processing.

We can have 3 types of errors: global, per row, or per column.

Global: it happens when 2 or more rows conflicts

Per row: it happens when all columns are valid individually but an error happen when they are used together.

Per column: it happens when a given column is wrong, and break the processing of a given row.

**Space**

We can have space before and after data because user typed spaced without noticing.

We should trim any data before processing it.

**Showing Results**

You need to show what rows were imported successfully.

You also need to who which rows were not processed correctly and why.
