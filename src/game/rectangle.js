"use strict";
exports.__esModule = true;
var vector_1 = require("./vector");
var Rectangle = /** @class */ (function () {
    function Rectangle(left, top, width, height) {
        this.position = vector_1.vector(left, top);
        this.size = vector_1.vector(width, height);
    }
    Object.defineProperty(Rectangle.prototype, "left", {
        get: function () {
            return this.position.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
        get: function () {
            return this.position.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this.size.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this.size.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () {
            return this.left + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () {
            return this.top - this.height;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.move = function (vec) {
        return new Rectangle(this.left + vec.x, this.right + vec.y, this.width, this.height);
    };
    return Rectangle;
}());
exports["default"] = Rectangle;
