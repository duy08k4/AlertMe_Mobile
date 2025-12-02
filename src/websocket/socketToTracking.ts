import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL + "/tracking";

class WebSocketManagerTracking {
    private static instance: WebSocketManagerTracking;
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
            }
        });

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        // Generic message handler
        this.socket.onAny((event, ...args) => {
            if (this.messageListeners.has(event)) {
                this.messageListeners.get(event)?.forEach(callback => callback(args[0]));
            }
        });
    }

    public static getInstance(): WebSocketManagerTracking {
        if (!WebSocketManagerTracking.instance) {
            WebSocketManagerTracking.instance = new WebSocketManagerTracking();
        }
        return WebSocketManagerTracking.instance;
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

export const webSocketManagerTracking = WebSocketManagerTracking.getInstance();
