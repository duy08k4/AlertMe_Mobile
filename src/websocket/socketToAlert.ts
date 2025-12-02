import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL + "/alerts";

class WebSocketManagerAlert {
    private static instance: WebSocketManagerAlert;
    public socket: Socket;
    private messageListeners: Map<string, ((data: any) => void)[]> = new Map();

    private constructor() {
        this.socket = io(URL, {
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            auth: {
                token: localStorage.getItem("accessToken")
            },
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        this.socket.on('connect_error', (err) => console.log('Connect error:', err.message));

        // Generic message handler
        this.socket.onAny((event, ...args) => {
            if (this.messageListeners.has(event)) {
                this.messageListeners.get(event)?.forEach(callback => callback(args[0]));
            }
        });
    }

    public static getInstance(): WebSocketManagerAlert {
        if (!WebSocketManagerAlert.instance) {
            WebSocketManagerAlert.instance = new WebSocketManagerAlert();
        }
        return WebSocketManagerAlert.instance;
    }

    public connect() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    public disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect();
        }
    }

     public joinRoom(event: string, id: string) { // If report => reportId, user => userId
        if (this.socket.connected) {
            try {
                this.socket.emit(event, id);
            } catch (error) {
                console.error(error)
                console.log("Can't join a specific-room (reportRoom)")
            }
        } else {
            console.error('Socket not connected. Cannot send message.');
        }
    }

    public leaveRoom(event: string, id: string) { // If report => reportId, user => userId
        if (this.socket.connected) {
            try {
                this.socket.emit(event, id);
            } catch (error) {
                console.error(error)
                console.log("Can't leave a specific-room (reportRoom)")
            }
        } else {
            console.error('Socket not connected. Cannot send message.');
        }
    }

    public sendMessage(event: string, data: any) {
        if (this.socket.connected) {
            this.socket.emit(event, data);
        } else {
            console.error('Socket not connected. Cannot send message.');
        }
    }

    public on(event: string, callback: (data: any) => void) {
        if (!this.messageListeners.has(event)) {
            this.messageListeners.set(event, []);
        }
        this.messageListeners.get(event)?.push(callback);
    }

    public off(event: string, callback: (data: any) => void) {
        if (this.messageListeners.has(event)) {
            const listeners = this.messageListeners.get(event);
            if (listeners) {
                const index = listeners.indexOf(callback);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        }
    }

    public isConnected(): boolean {
        return this.socket.connected;
    }
}

export const webSocketManagerAlert = WebSocketManagerAlert.getInstance();
