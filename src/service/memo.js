import firebase from "firebase";
/**
 * メモIDをもとにメモ情報を取得します。
 * @param  {String} memoId
 * @returns メモ情報
 */
function searchMemoByMemoId(memoId) {
	return firebase.firestore().collection("memo").doc(memoId).get();
}

export default {
	searchMemoByMemoId
};
