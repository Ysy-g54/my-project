/**
 * @module utils/ui/jquery-ex
 */

import $ from 'jquery';
import 'materialize-css';

/**
 * @namespace
 * @see http://materializecss.com/dropdown.html
 */
let dropdown = {
	/**
	 * initializeを行います。
	 *
	 * @param {Object} vm Vueインスタンス
	 * @param {string} selector 処理対象のセレクタ
	 * @param {Object} options 初期化オプション
	 */
	initialize(vm, selector, options) {
		let element = $(vm.$el).find(selector);
		if (!element[0]) {
			return;
		}
		let _options = Object.assign({
			inDuration: 300,
			outDuration: 225,
			constrainWidth: false, // Does not change width of dropdown to that of the activator
			hover: false, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: true, // Displays dropdown below the button
			alignment: 'left', // Displays dropdown with edge aligned to the left of button
			stopPropagation: true // Stops event propagation
		}, options);
		element.dropdown(_options);
	},

	/**
	 * closeを行います。
	 *
	 * @param {Object} vm Vueインスタンス
	 * @param {String} selector 処理対象のセレクタ
	 */
	close(vm, selector) {
		let element = $(vm.$el).find(selector);
		if (!element[0]) {
			return;
		}
		element.dropdown('close');
	}
};

/**
 * @namespace
 * @see http://materializecss.com/dialogs.html
 */
let tooltip = {
	/**
	 * initializeを行います。
	 *
	 * @param {Object} vm Vueインスタンス
	 * @param {string} selector 処理対象のセレクタ
	 * @param {Object} options 初期化オプション
	 */
	initialize(vm, selector, options) {
		let element = $(vm.$el).find(selector);
		if (!element[0]) {
			return;
		}
		let _options = Object.assign({
			position: 'top',
			delay: 50
		}, options);
		element.tooltip(_options);
	},

	/**
	 * destroyを行います。
	 *
	 * @param {Object} vm Vueインスタンス
	 * @param {string} selector 処理対象のセレクタ
	 */
	destroy(vm, selector) {
		let element = $(vm.$el).find(selector);
		if (!element[0]) {
			return;
		}
		element.tooltip('remove');
	}
};

export default { dropdown, tooltip };
