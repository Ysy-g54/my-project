import firebase from "firebase";
import "firebase/firestore";

/**
 * ユーザー設定を登録します。
 * @param  {Object} userSetting
 * @returns 登録したユーザー設定情報
 */
function register(userSetting) {
	return firebase.firestore().collection("userSetting").add(userSetting);
}

export default {
	register
};
