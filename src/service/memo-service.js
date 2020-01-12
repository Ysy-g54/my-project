import firebase from "firebase";

/**
 * 削除フラグをもとにメモ情報リストを取得します。
 * @param  {String} userId
 * @param  {Boolean} deleteFlg
 * @returns メモ情報リスト
 */
function searchMemoByDeleteFlg(userId, deleteFlg) {
	return firebase.firestore().collection("memo")
		.where("userId", "==", userId)
		.where("deleteFlg", "==", deleteFlg).orderBy("insertDateTime", "desc").get();
}

/**
 * メモIDをもとにメモ情報を取得します。
 * @param  {String} memoId
 * @returns メモ情報
 */
function searchMemoByMemoId(memoId) {
	return firebase.firestore().collection("memo").doc(memoId).get();
}

export default {
	searchMemoByDeleteFlg,
	searchMemoByMemoId
};
