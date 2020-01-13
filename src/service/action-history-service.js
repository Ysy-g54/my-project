import firebase from "firebase";
import "firebase/firestore";

/**
 * ユーザIDをもとに行動履歴情報リストを取得します。
 * @param  {String} userId
 * @returns 行動履歴情報リスト
 */
function searchByUserId(userId) {
	return firebase.firestore().collection("actionHistory")
		.where("userId", "==", userId)
		.orderBy("actionDateTime", "desc").get();
}

/**
 * 行動履歴情報を登録します。
 * @param  {Object} actionHistory
 * @returns 登録した行動履歴情報
 */
function register(actionHistory) {
	return firebase.firestore().collection("actionHistory").add(actionHistory);
}

export default {
	searchByUserId,
	register
};
