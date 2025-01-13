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

export function checkReallocate(latest_ambassador_recored , latest_leader){
    if (latest_ambassador_recored && latest_leader) {

        const updatedAt = new Date(latest_ambassador_recored.updated_at);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        if (updatedAt < threeMonthsAgo) {
            //The record was updated more than three months ago.
            return true;
        } else {
            return false;
        }

    }
    return true;
}

export function getHighestRole(roles) {
    const rolePriority = ["admin", "consultant", "advisor", "supervisor", "leader", "ambassador"];

    for (const priority of rolePriority) {
        if (roles.includes(priority)) {
            return priority;
        }
    }

    return "ambassador";
}

export function extractRoleNames(roles) {
    return roles.map(role => role.name);
}
