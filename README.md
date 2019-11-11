# yemot-router

Because I do not know English, the documents are now in Hebrew.
With the help of God in teaching English, I'll translate that.

<div dir="rtl" text-align="right">

לתכנת מערכת ב'ימות-המשיח' בקלות.

# התקנה (NodeJS)
<div dir="ltr" text-align="left">

```bash
npm i yemot-router
```
<div dir="rtl" text-align="right">

# שימוש

התקשורת עם המשתמש, נעשית דרך האובייקט `Call`.
מחלקת הראוטר מקבלת כפרמטר פונקציית קולבק (CallBack), שהפרמטר שלה הוא אובייקט ה`Call`.
עם המתודות של האובייקט הזה, ניתן להפעיל ולהפנות את המשתמש.

## דוגמא בסיסית
<div dir="ltr" text-align="left">

```js
const express = require("express");
const port = 3000;

const app = express();

const yemot_router = require("./");

const y = yemot_router();

y.add_fn(async (call) => {

	let massage = [{ type: "text", data: "היי, תקיש 10" }];
	let r = await call.read(massage);

	console.log(r);

	massage = [{ type: "text", data: "הקשת " + r + " תקיש 1 ותעוף מפה" }];
	call.id_list_message(massage);

	console.log("noop");
});

app.use("/", y);

app.listen(port, () => {
	console.log("lisen in port", port);
});
```

<div dir="rtl" text-align="right">

## מתודות אובייקט ה`Call`

<div dir="ltr" text-align="left">

### `read(massage : [], mode : string, options : {}) : Promise`
<div dir="rtl" text-align="right">

מתודה לשאילת שאלה את המשתמש, וקבלת התשובה מתי שתגיע, ע"י הבטחה (Promise).

<div dir="ltr" text-align="left">

#### `massage : Array`
<div dir="rtl" text-align="right">

הפרמטר הראשון, הוא השאלה שהמשתמש ישמע. מערך של אובייקטים, שכל אחד מהם הוא קובץ או הקראה, שתושמע למשתמש.

טקסט שיוקרא למשתמש:
<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "text", data: "היי, תקיש 10" }
];
```
<div dir="rtl" text-align="right">
השמעת קובץ במערכת:
<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "file", data: "000" }
];
```
<div dir="rtl" text-align="right">
השמעת מספר:
<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "number", data: "512" }
];
```
<div dir="rtl" text-align="right">
השמעת ספרות:
<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "digits", data: "077313770" }
];
```
<div dir="rtl" text-align="right">
הקראת קובץ טקסט הנמצא במערכת:

<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "speech", data: "000" }
];
```
<div dir="rtl" text-align="right">
הקראת אותיות באנגלית:

<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "alpha", data: "abc@gmail.com" }
];
```


<div dir="ltr" text-align="left">