export function urlifyFn(text) {
    if (text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
        return (
            '<a href="' +
            url +
            '"  target="_blank" direction: rtl;">' +
            url +
            "</a>"
        );
        });
    }
}
export function stylizeHashtags(text) {
    if (text) {
        let hashtagRegex = /#([\u0600-\u06FF\w]+)/g;
        return text.replace(hashtagRegex, function (hashtag) {
        return (
            '<span style="font-weight: bold; color: #1d1a55;">' +
            hashtag +
            "</span>"
        );
        });
    }
}
export function processText(text) {
    text = urlifyFn(text); // First, turn URLs into hyperlinks
    text = stylizeHashtags(text); // Then, style hashtags
    return text;
}
