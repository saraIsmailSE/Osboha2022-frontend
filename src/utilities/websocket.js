import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
window.Pusher.logToConsole = true;

export function connectToServer() {
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: "0098112dc7c6ed8e4777180",
        cluster: "mt1",
        wsHost: process.env.VUE_APP_WEBSOCKET_BASE_URL,
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: true,
        disableStats: true,
        authEndpoint: `${process.env.VUE_APP_WEBSOCKET_BASE_URL}broadcasting/auth`,
        auth: {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("osboha__token"),
            },
        },
        enabledTransports: ["ws", "wss"],
    });

    window.Echo.connector.pusher.connection.bind('error', (err) => {
        console.error('Error connecting to Pusher:', err);
    });

    window.Echo.connector.pusher.connection.bind('state_change', (states) => {
        console.log('Connection state change:', states);
    });

    return window.Echo;
}
