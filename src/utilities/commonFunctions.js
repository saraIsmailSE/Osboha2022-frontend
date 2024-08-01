import helper from "@/utilities/helper";
import clipboardCopy from "clipboard-copy";
import moment from 'moment';

export function copyToClipboard(text) {
    clipboardCopy(text)
    .then(() => {
        helper.toggleToast("تم النسخ", "success");
    })
    .catch((err) => {
        helper.toggleToast("حصل خطأ - لم يتم النسخ!", "danger");
    });
}

export function getFormatedDate(date){
    return moment(String(date)).format('MM/DD/YYYY hA')
}