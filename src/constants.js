/**
 * メモカテゴリ
 */
export const categories = [
	{ categoryId: "1", categoryNm: "目標" },
	{ categoryId: "2", categoryNm: "メモ" },
	{ categoryId: "3", categoryNm: "ToDo" },
	{ categoryId: "4", categoryNm: "その他" }
];

/**
 * アクションタイプ
 */
export const actionTypes = [
	{ actionType: "add", categoryNm: "追加" },
	{ actionType: "update", categoryNm: "更新" },
	{ actionType: "delete", categoryNm: "削除" }
];

/**
 * データタイプ
 */
export const dataTypes = [
	{ dataType: "memo", categoryNm: "メモ" },
	{ dataType: "setting", categoryNm: "設定" },
	{ dataType: "profile", categoryNm: "プロフィール" }
];
