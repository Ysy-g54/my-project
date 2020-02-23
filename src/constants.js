/**
 * メモカテゴリ
 */
export const categories = [
	{ categoryId: "", categoryNm: "-----" },
	{ categoryId: "1", categoryNm: "目標" },
	{ categoryId: "2", categoryNm: "メモ" },
	{ categoryId: "3", categoryNm: "ToDo" },
	{ categoryId: "4", categoryNm: "その他" }
];

/**
 * アクションタイプ
 */
export const actionTypes = [
	{ actionType: "add", actionNm: "追加" },
	{ actionType: "update", actionNm: "更新" },
	{ actionType: "delete", actionNm: "削除" }
];

/**
 * データタイプ
 */
export const dataTypes = [
	{ dataType: "memo", dataNm: "メモ" },
	{ dataType: "setting", dataNm: "設定" },
	{ dataType: "profile", dataNm: "プロフィール" }
];

/**
 * 共有するアプリの種類
 */
export const shareApps = [
	{ appNm: "LINE", url: "http://line.me/R/msg/text/?", img: require('@/assets/share/1485482196-line_78675.svg') },
	{ appNm: "twitter", url: "http://twitter.com/share?text=", img: require('@/assets/share/Twitter_icon-icons.com_66803.svg') },
	{ appNm: "Gmail", url: "https://mail.google.com/mail/?view=cm&body=", img: require('@/assets/share/gmail_icon_130929.svg') }
	// { appNm: "Gmail", url: "https://slack.com/api/postMessage?", img: require('@/assets/share/slack_icon_130829.svg') }
];
