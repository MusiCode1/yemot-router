# yemot-router

Because I do not know English, the documents are now in Hebrew.
With the help of God in teaching English, I'll translate that.

<div dir="rtl" text-align="right">

לתכנת מערכות מתקדמות ב'ימות-המשיח' בקלות באמצעות [מודול API](https://f2.freeivr.co.il/post/76).

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

<details>
<summary>4.0.0</summary>
בגרסה 4.0.0 שינוי משמעותי:

במקום לבדוק בכל פעם את המאפיין `hangup`,

כעת בעת ניתוק, פשוט תיזרק שגיאה.

ניתן לתפוס אותה להתנהגות מותאמת אישית (ראה דוגמה  בקובץ `exemple.js/.`),

או להתעלם, לעצירה של הסקריפט.
</details>

# דוגמא בסיסית
<div dir="ltr" text-align="left">

 ./exemple.js

<div dir="rtl" text-align="right">

# מתודות אובייקט ה`Call`

<div dir="ltr" text-align="left">

### `read(massage : [], mode : string, options : {}) : Promise`

מתודה לשאילת שאלה את המשתמש, וקבלת התשובה מתי שתגיע, ע"י הבטחה (Promise).

<details>
<div dir="rtl" text-align="right">

#### הפרמטר `massage`

הפרמטר הראשון, הוא השאלה שהמשתמש ישמע. מערך של אובייקטים, שכל אחד מהם הוא קובץ או הקראה, שתושמע למשתמש.

טקסט שיוקרא למשתמש:

<div dir="ltr" text-align="left">

```js
let massage = [
	{ type: "text", data: "היי, תקיש 10" }
];
let massage = [{ type: 'text', data: 'היי, תקיש 10' }];
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

#### הפרמטר `mode`

הפרמטר הזה קובע, האם לקבל תשובה, ע"י הקשה, זיהוי דיבור, או הקלטה.

האפשרויות:

<div dir="ltr" text-align="left">

`tap` = הקשה

`stt` = זיהוי דיבור

`record` = הקלטה

<div dir="rtl" text-align="right">

#### הפרמטר `options`

בפרמטר הזה, ניתן להעביר אפשרויות נוספות, כגון סך הקשות מינימלי, מקסימלי, וכו'.

##### ערכי ברירת מחדל - הקשה

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
	[ראו exemple.js]
	האופציות הקיימות:
	"Number" | "Digits" | "File" | "TTS" | "Alpha" | "No" | "HebrewKeyboard" |
	"EmailKeyboard" | "EnglishKeyboard" | "DigitsKeyboard" | "TeudatZehut" |
	 "Price" | "Time" | "Phone" | "No"
	פירוט על כל אופציה ניתן למצוא בתיעוד מודול API של ימות המשיח, תחת"הערך השישי (הקשה)".
	*/
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

	/* האם לחסום שינוי שפת מקלדת */
	block_change_type_lang: false,
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

##### ערכי ברירת מחדל - הקלטה

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

</details>

### `go_to_folder(folder: string): void`
מתודה להעברת השיחה לשלוחה מסוימת במערכת הנוכחית.
ניתן לכתוב נתיב יחסי לשלוחה הנוכחית או לשלוחה הראשית. פירוט על האופציות ניתן לקרוא [כאן](https://f2.freeivr.co.il/post/58).
ניתן להעביר בפרמטר folder את הסטרינג `hangup`, וכך לנתק את השיחה.

### `restart_ext()`

מתודה פשוטה ללא ארגומנטים להפעלה מחדש של השלוחה הנוכחית.
זהה לכתיבה הבאה:
```js
go_to_folder(`/${call.ApiExtension}`);
```

### `id_list_message(massages: array, wait_to_more_action: Boolean)`

במתודה זו ניתן להשמיע למשתמש הודעה אחת, או מספר הודעות ברצף.

----------

<div style="border: 1.5px solid; color: #ff6037" dir="rtl">
באם מעוניינים לשרשר פעולה נוספת, לדוגמה להשמיע הודעה ואז לבצע <code>read</code> (קבלת נתונים נוספים), יש להעביר לארגומנט השני <code>true</code>.
באם אחרי השמעת ההודעה מעוניינים שהמאזין ייצא מהשלוחה, ניתן להשאיר את הפרמטר השני ריק.
</div>

----------

<details>
הפונקציה מקבלת כארגומנט ראשון מערך של אובייקטי הודעה. כל אובייקט במערך צריך להיות במבנה הבא:

```js
{ type: string, data: string }
```

ואם ה`type` הוא `zmanim`:

```js
{  type: string, data: object }
```

ראה פירוט נוסף להלן.

#### הפרמטר `type`

הערך `type` מקבל סטרינג של סוג ההשמעה.
האפשרויות הקיימות עבור type הן:

- `file` - השמעת קובץ מתוך המערכת או מהמאגר הגלובלי
- `digits` - השמעת ספרות (לדוגמה 111 המערכת תשמיע "אחת אחת אחת")
- `number` - השמעת מספר (לדוגמה 111 המערכת תשמיע "מאה ואחת עשרה")
- `alpha` - השמעת אותיות (לדוגמה abc המערכת תשמיע "איי בי סי")
- `text` - הקראת טקסט
- `speech` - הקראת טקסט מתוך קובץ במערכת
- `zmanim` - השמעה שעה לפי משתנה
- `go_to_folder` - מעבר לשלוחה אחרת (לא ניתן לשרשר הודעות/פקודות נוספות לאחר פקודה זו)
- `system_message` - השמעת הודעת מערכת (מקבל ב`data` את מספר ההודעה, עם או בלי `M` בהתחלה.)

#### הפרמטר `data`

הערך `data` מקבל את תוכן ההודעה להשמעה - עבור השמעת ספרות/אותיות/טקסט, או את נתיב הקובץ/התקיה עבור file/go_to_folder (בהתאמה).

חריג הוא הטייפ **zmanim**:

עבור השמעת זמנים (כלומר אם הערך של type הוא `zmanim`), הערך השני (`data`) יהיה **אובייקט**, ולא סטרינג, במבנה הבא:

```js
{
 time: string, // optional, default: "T" (current time)
 zone: string,
 difference: string // optional, default: "IL/Jerusalem"
}
```

#### הערך `time`:

סוג הזמן שרוצים להשמיע.

ברירת מחדל: "`T`" = השעה הנוכחית.

#### הערך `zone`:

אזור הזמן שעבורו יש לחשב את הזמנים.

ברירת מחדל: `IL/Jerusalem`.

ניתן לראות [כאן](https://f2.freeivr.co.il/post/82868) את רשימת אזורי הזמן הקיימים במערכת.

ניתן לראות [כאן](https://f2.freeivr.co.il/post/82875) את רשימת הזמנים האפשריים.

#### הערך `difference`:

ערך זה משמש להוספה/הסרה מלאכותית של זמן על הזמן שמשמיעים.
באם לא יועבר פרמטר זה, יושמע הזמן ללא שינוי.

הערך **`difference`** מכיל קודם את סוג הפעולה - פלוס (+) להוספת זמן, או מינוס (-) להפחתת זמן, ואז את הזמן על פי הצורה הבאה: Y - שנה M - חודש D - יום H - שעה m - דקה S - שניה s - אלפית שניה למשל, עבור 20 דקות אחורה יש להגדיר `m20-`, עבור 3 שעות קדימה יש לרשום `H3+`. עבור יומיים אחורה יש לרשום `D1-`.

לדוגמה, עבור השמעת זמן שקיעת החמה מחר בעיר בני ברק:

```js
let massage = [
    {
        type: 'zmanim',
        data: {
            time: 'sunset',
            zone: 'IL/Bney_Brak',
            difference: '+1D',
        },
    },
];
```

</details>

### `routing_yemot(phone: string)`

מתודה להעברת השיחה למערכת אחרת בימות המשיח ללא עלות יחידות, באמצעות "ראוטינג ימות".

הפונקציה מקבלת ארגומנט יחיד - סטרינג של מספר מערכת בימות להעברת השיחה.
ניתן גם לנתב את השיחה ממערכת בשרת הפריווט לשרת הרגיל ולהיפך.


### `send(data: string)`

ניתן להשתמש במתודה זו כדי לשלוח סטרינג חופשי לחלוטין, לדוגמה עבור פונקציונליות שעדיין לא נתמכת בספרייה.

באופציה זו יש להעביר את הסטרינג בדיוק כפי שמעוניינים שהשרת של ימות יקבל אותו.
