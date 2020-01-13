import firebase from "firebase";
import "firebase/firestore";

/**
 * 削除フラグをもとにメモ情報リストを取得します。
 * @param  {String} userId
 * @param  {Boolean} deleteFlg
 * @returns メモ情報リスト
 */
function searchByDeleteFlg(userId, deleteFlg) {
	return firebase.firestore().collection("memo")
		.where("userId", "==", userId)
		.where("deleteFlg", "==", deleteFlg).orderBy("insertDateTime", "desc").get();
}

/**
 * メモIDをもとにメモ情報を取得します。
 * @param  {String} memoId
 * @returns メモ情報
 */
function searchByMemoId(memoId) {
	return firebase.firestore().collection("memo").doc(memoId).get();
}

/**
 * メモ情報を登録します。
 * @param  {Object} memo
 * @returns 登録したメモ情報
 */
function register(memo) {
	return firebase.firestore().collection("memo").add(memo);
}

/**
 * メモ情報を更新します。
 * @param  {Object} memo
 * @param  {String} memoId
 * @returns 更新したメモ情報
 */
function modify(memo, memoId) {
	return firebase.firestore().collection("memo").doc(memoId).set(memo);
}

/**
 * メモ情報を更新します。
 * @param  {String} memoId
 * @param  {Boolean} deleteFlg
 * @returns 更新したメモ情報
 */
function modifyDeleteFlg(memoId, deleteFlg) {
	return firebase.firestore().collection("memo").doc(memoId).update({ deleteFlg: deleteFlg });
}

export default {
	searchByDeleteFlg,
	searchByMemoId,
	register,
	modify,
	modifyDeleteFlg
};
