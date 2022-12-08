"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validTags = ["Hobby", "Work", "Chores", "RelationShip", "Family", "School", "Entertainment"];
const TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    due: {
        type: String,
        required: false,
        enum: {
            values: ["Today", "Yesterday", "Tomorrow", "This Week", "This Weekend", "Next Week", "This Month"],
            message: "Invalid Due"
        }
    },
    note: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        validate: {
            validator: function (inpTgs) {
                const boolTags = inpTgs.map(tg => validTags.includes(tg));
                return boolTags.every(booltg => booltg === true);
            },
            message: (props) => `${props.value} is not valid`
        },
        required: false
    }
}, { id: true, toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false } });
const Task = (0, mongoose_1.model)("Task", TaskSchema);
exports.default = Task;
