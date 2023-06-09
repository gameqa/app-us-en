import { State } from "./interface";
import { Actions, ActionTypes } from "../../actions";

export const initialState: State = {
	username: "",
	email: "",
	type: "loading",
	_id: "",
	scoreCard: {
		questions: 0,
		answers: 0,
		answerVerifications: 0,
		questionVerifications: 0,
		articles: 0,
		hiscoreRank: -2,
		invites: 0,
	},
	level: 1,
	hasCompletedTutorial: false,
	invites: [],
	streak: 1,
	resetCount: 0,
	isResettingLevel: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case ActionTypes.logOutUser: {
			return { ...initialState, type: "guest" };
		}
		case ActionTypes.fetchUserFromToken: {
			return { ...initialState, ...action.payload };
		}
		case ActionTypes.registerUser:
			return { ...initialState, ...action.payload };
		case ActionTypes.setResettingLevel: {
			return {
				...state,
				isResettingLevel: true,
			};
		}
		case ActionTypes.resetLevel:
			return {
				...state,
				...action.payload,
				isResettingLevel: false,
			};
		case ActionTypes.moveToTutorial:
			return {
				...state,
				type: "on-tutorial"
			}
		case ActionTypes.fetchInvites: {
			return {
				...state,
				invites: action.payload,
			};
		}
		default:
			return state;
	}
};

export default reducer;
export * from "./interface";
