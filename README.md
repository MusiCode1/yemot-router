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

# Change log

### 4.0.0
בגרסה 4.0.0 שינוי משמעותי:

במקום לבדוק בכל פעם את המאפיין `hangup`, 

כעת בעת ניתוק, פשוט תזרק שגיאה.

ניתן לתפוס אותה להתנהגות מותאמת אישית,

או להתעלם, לעצירה של הסקריפט.

# דוגמא בסיסית
<div dir="ltr" text-align="left">

 ./exemple.js

<div dir="rtl" text-align="right">

# מתודות אובייקט ה`Call`

<div dir="ltr" text-align="left">

###  `read(massage : [], mode : string, options : {}) : Promise`
<div dir="rtl" text-align="right">

מתודה לשאילת שאלה את המשתמש, וקבלת התשובה מתי שתגיע, ע"י הבטחה (Promise).

#### הפרמטר  `massage` :
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
<div dir="rtl" text-align="right">

#### הפרמטר  `mode` :
הפרמטר הזה קובע, האם לקבל תשובה, ע"י הקשה, זיהוי דיבור, או הקלטה.

האפשרויות:
<div dir="ltr" text-align="left">

`tap` = הקשה

`stt` = זיהוי דיבור

`record` = הקלטה
<div dir="rtl" text-align="right">

#### הפרמטר  `options` :
בפרמטר הזה, ניתן להעביר אפשרויות נוספות, כגון סך הקשות מינימלי, מקסימלי, וכו'.

##### ערכי ברירת מחדל - הקשה:
<div dir="ltr" text-align="left">

```js
let options = {
	
	/* שם הערך בימות
	 ברירת מחדל, נקבע אוטומטית,
	 val_1, val_2 ... */
	val_name: "val_x", 

	/* האם לבקש את הערך שוב אם קיים. */
	re_enter_if_exists: false,

	/* כמות ההקשות המקסימלית */
	max: "*",

	/* כמות ההקשות המינימלית */
	min: 1,

	/* שניות להמתנה */
	sec_wait: 7,

	/* צורת ההשמעה למשתמש את הקשותיו */
	/* באם מעוניינים במקלדת שונה ממקלדת ספרות, כגון EmailKeyboard או HebrewKeyboard, יש להכניס כאן את סוג המקלדת
	[ראו exemple.js] */
	/
	play_ok_mode: "No",

	/* האם לחסום הקשה על כוכבית */
	block_asterisk: false,

	/* האם לחסום הקשה על אפס */
	block_zero: false,

	/* החלפת תווים*/
	replace_char: "",

	/* ספרות מותרות להקשה - מערך
	[1, 2, 3 ...]
	*/
	digits_allowed: [],

	/* אחרי כמה שניות להשמיע שוב את השאלה */
	amount_attempts: "",

	/* אם המשתמש לא ענה, האם לשלוח ערך*/
	read_none: false,

	/* הערך שיישלח באין תשובה */
	read_none_var: ""
}
```
<div dir="rtl" text-align="right">

##### ערכי ברירת מחדל - זיהוי דיבור:
<div dir="ltr" text-align="left">

```js
let options = {

	lang: "",

	allow_typing: false
};
```

<div dir="rtl" text-align="right">

##### ערכי ברירת מחדל - הקלטה:
<div dir="ltr" text-align="left">

```js
let options = {

	path: "",

	file_name: "",

	record_ok: true,

	record_hangup: false,

	record_attach: false,

	lenght_min: "",

	lenght_max: ""
};
```

### `go_to_folder(folder: string): void`

### `restart_ext()`

### `id_list_message(massage)`

### `routing_yemot(phone)`

### `send(data)`


<div dir="ltr" text-align="left">