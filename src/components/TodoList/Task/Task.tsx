import {useDispatch} from "react-redux";
import {deleteTaskTC, updateTaskTC} from "../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "../../../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/api";

type TaskPropsType = {
    task: TaskType
    filter: FilterValuesType
    todolistId: string

}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const RemoveTask = useCallback(() => {
        dispatch(deleteTaskTC(props.todolistId, props.task.id))
        },
        //массив зависимостей (все, что используем извне)
        [dispatch, props.task.id, props.todolistId]);
    const ChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked;
        //отправляем в модельке только нужное для изменения свойство
        dispatch(updateTaskTC(props.todolistId, props.task.id, {status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.New}));
    }, [dispatch, props.task.id, props.todolistId]);
    const ChangeTaskTitle = useCallback((newValue: string) =>
            //отправляем в модельке только нужное для изменения свойство
            dispatch(updateTaskTC(props.todolistId, props.task.id, {title: newValue},)),
        [dispatch, props.task.id, props.todolistId]);

    return (
        <li key={props.task.id}
            className={props.filter !== "completed" && props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            {/*прозрачный класс добавится когда таска чекнута и не в фильтре комплитед*/}
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={ChangeTaskStatus}
                      color="primary"/>
            <EditableSpan title={props.task.title} onChange={ChangeTaskTitle}/>
            <IconButton onClick={RemoveTask}>
                <Delete/>
            </IconButton>
        </li>
    )
});