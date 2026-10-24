---
id: editor-react-conf
title: Editor - React Conf
tags:
  - frontend
  - react
---

Content Editable is an attribute that let any element to be editable

Content Editable is usually use to build rich text editors, or markdown editors, or any kind of editors.

[The era of Content Builders](./the-era-of-content-builders)

- https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480

**What you need for a Editor?**

You need a model for the document

You need a map 1-1 from document to visible screen (usually DOM or native nodes)

You need to handle selections in a good way

You need to handle carets

You need to define edit operations based on key press and mouse clicks

**How Medium editor works?**

- it has sections and paragraphs
- a paragraph contains text and formatting, and also a layout information
- a section describes background for a sublist of paragraphs

**How Notion editor works?**

it has a list of basic blocks (text, page, todo list, image, kanban, calendar, database)

each basic block has its own properties

You edit one block per time.

React Conf BR

Drafjs: from RichText to Content Builders

- https://www.youtube.com/watch?v=rHat0n1xBVc

- https://www.youtube.com/watch?v=w-PqnpMizcQ

- https://learn-draftjs-now.vercel.app/data-model
