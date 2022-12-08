import { model, Schema } from 'mongoose';

const validTags:Array<string> = ["Hobby", "Work", "Chores", "RelationShip", "Family", "School", "Entertainment"]

const TaskSchema = new Schema({
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
            validator: function (inpTgs: [string]):boolean {
                const boolTags:Array<boolean> = inpTgs.map(tg=>validTags.includes(tg));
                return boolTags.every(booltg=>booltg===true);
            },
            message: (props:any)=>`${props.value} is not valid`
        },
        required: false
    }
})

const Task = model("Task", TaskSchema);

export default Task;