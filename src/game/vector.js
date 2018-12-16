"use strict";
exports.__esModule = true;
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector.add = function (a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };
    Vector.prototype.add = function (b) {
        return Vector.add(this, b);
    };
    Vector.prototype.scale = function (s) {
        return new Vector(this.x * s, this.y * s);
    };
    Object.defineProperty(Vector.prototype, "array", {
        get: function () {
            return [this.x, this.y];
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
exports.Vector = Vector;
var vector = function (x, y) { return new Vector(x, y); };
exports.vector = vector;
exports["default"] = Vector;
