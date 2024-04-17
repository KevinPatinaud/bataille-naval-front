import { CompatClient, Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { WebSocketService } from "./webSocket.service";

jest.mock("@stomp/stompjs");
jest.mock("sockjs-client");

describe("WebSocketService", () => {
  let service: WebSocketService;
  let mockStompClient: Partial<CompatClient>;

  beforeEach(() => {
    mockStompClient = {
      connect: jest.fn(),
      subscribe: jest.fn(),
      send: jest.fn(),
      disconnect: jest.fn(),
      forceDisconnect: jest.fn(),
      connected: false,
    };

    (Stomp.over as jest.Mock) = jest.fn(() => mockStompClient);

    service = new WebSocketService();
  });

  it("should connect", () => {
    const callback = jest.fn();
    service.connect(callback);
    expect(mockStompClient.connect).toHaveBeenCalledWith({}, callback);
  });

  it("should check the connection", () => {
    expect(service.connectionIsWorking()).toBe(false);
  });

  it("should subscribe to URI", () => {
    const callback = jest.fn();
    const uri = "/topic/test";
    service.subscribe(uri, callback);
    expect(mockStompClient.subscribe).toHaveBeenCalledWith(uri, callback);
  });

  it("should send data", () => {
    const uri = "/topic/send";
    const data = "test message";
    service.send(uri, data);
    expect(mockStompClient.send).toHaveBeenCalledWith(uri, {}, data);
  });

  it("should disconnect and reconnect", () => {
    service.forceDeconnection();
    expect(mockStompClient.forceDisconnect).toHaveBeenCalled();
    // Vérifier si Stomp.over a été appelé une seconde fois pour recréer le stompClient
    expect(Stomp.over).toHaveBeenCalledTimes(2);
  });
});
