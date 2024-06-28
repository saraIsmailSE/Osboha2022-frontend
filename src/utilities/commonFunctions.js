import helper from "@/utilities/helper";
import clipboardCopy from "clipboard-copy";

export function copyToClipboard(text) {
    clipboardCopy(text)
    .then(() => {
        helper.toggleToast("تم النسخ", "success");
    })
    .catch((err) => {
        helper.toggleToast("حصل خطأ - لم يتم النسخ!", "danger");
    });
}
