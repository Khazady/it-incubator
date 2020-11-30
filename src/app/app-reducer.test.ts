import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = { status: 'idle', error: null }})

test('status should be changed to succeeded', () => {

    const action = setAppStatusAC('succeeded');

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded');
});

test('error message should be changed', () => {

    const action = setAppErrorAC('Some error occurred');

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('Some error occurred');
});