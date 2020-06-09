import Vue from 'vue';
import * as ledap from 'ledap';
import request from './http.js';
Vue.prototype.$ledap = ledap;

// 以下是ledap组件
const themeConfig = {
    'form-item': {
        template: `
        <component :is="tag" class="l-form-item" :class="{ 'is-required': model.isRequired(attr) }" :id="attr + 'Item'">
            <slot name="label" :model="model" :attr="attr">
                <label class="l-form-label">
                    <span class="l-form-label-text">
                        <span>{{model.getAttributeLabel(attr)}}</span><span class="label-quote">:</span>
                    </span>
                </label>
            </slot>
            <div class="l-form-item-content">
                <slot :model="model" :attr="attr" :validate="validate" :inputListeners="inputListeners">
                    <baseinput :model="model" :attr="attr" :inputListeners="inputListeners" v-bind="$attrs"></baseinput>
                </slot>
                <slot name="error" :model="model" :attr="attr" :showError="showError">
                    <div v-show="showError" class="l-form-item-error">{{showError}}</div>
                </slot>
            </div>
        </component>`
    },
    "baseinput": {
        template: `<div v-if="tag !== 'textarea'" class="l-input-wrapper">
            <input class="l-input" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
        </div>
        <div v-else class="l-input-wrapper v-textarea-wrapper">
            <textarea class="l-input" :name="attr" :value="model[attr]" :placeholder="model.getAttributeHint(attr)" v-on="inputListeners" v-bind="$attrs" :maxlength="cMaxlength">
            </textarea>
            <div class="l-input-number">
                {{ model[attr] ? model[attr].length : 0 }}/{{ cMaxlength }}
            </div>
        </div>`,
    }
};

const webDpConfig = {
    primaryKey: 'id',
    timeWait: 600
};

ledap.App.config({
    themeConfig,
    webDpConfig,
    request
});
ledap.App.register(Object.keys(ledap.App.getTheme().components), Vue);