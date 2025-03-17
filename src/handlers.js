"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotifyToken = getSpotifyToken;
exports.searchSpotify = searchSpotify;
exports.playMusic = playMusic;
var axios_1 = require("axios");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var SPOTIFY_API = "https://api.spotify.com/v1";
var CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
var CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
var ACCESS_TOKEN = "";
// 🎵 Function: Get Spotify Access Token
function getSpotifyToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("https://accounts.spotify.com/api/token", new URLSearchParams({ grant_type: "client_credentials" }), {
                            headers: {
                                Authorization: "Basic ".concat(Buffer.from("".concat(CLIENT_ID, ":").concat(CLIENT_SECRET)).toString("base64")),
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    ACCESS_TOKEN = response.data.access_token;
                    return [2 /*return*/, ACCESS_TOKEN];
                case 2:
                    error_1 = _a.sent();
                    throw new Error("Error getting Spotify token");
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 🔍 Function: Search for Songs on Spotify
function searchSpotify(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!ACCESS_TOKEN) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSpotifyToken()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("".concat(SPOTIFY_API, "/search"), {
                            headers: { Authorization: "Bearer ".concat(ACCESS_TOKEN) },
                            params: { q: query, type: "track", limit: 10 },
                        })];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, response.data.tracks.items.map(function (track) { return ({
                            name: track.name,
                            artist: track.artists.map(function (a) { return a.name; }).join(", "),
                            album: track.album.name,
                            uri: track.uri,
                        }); })];
                case 4:
                    error_2 = _a.sent();
                    throw new Error("Error searching Spotify");
                case 5: return [2 /*return*/];
            }
        });
    });
}
// ▶️ Function: Play Music (Mock Response)
function playMusic(songUri) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!ACCESS_TOKEN) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSpotifyToken()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: 
                // 🚀 Real implementation would require Spotify Premium & User Authentication
                return [2 /*return*/, { message: "Playing song: ".concat(songUri, " (Mock Response - Requires User Token)") }];
            }
        });
    });
}
