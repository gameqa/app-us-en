import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { IProps, SelectionStates } from "./interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../services";

import { useDispatch } from "react-redux";
import {
	addNotificationItem,
	clearNotifications,
} from "../../../../../actions/notification";

const SpanSelector = ({
	firstWord,
	lastWord,
	immutable,
	paragraph,
	onSelectFirstWord,
	onClearSelection,
	onSelectLastWord,
}: IProps) => {
	const [selectionState, setSelectionState] =
		useState<SelectionStates>("select-first");

	let action: ((v: number) => any) | undefined;

	const handleClick = useCallback(
		(i) => {
			if (immutable) return;

			if (firstWord === undefined) {
				onSelectFirstWord(i);
				firstWord = lastWord = -1;
				setSelectionState("select-last");
			} else if (lastWord === undefined) {
				onSelectLastWord(i);
				lastWord = firstWord;
				setSelectionState("clear-selection");
			} else {
				onClearSelection();
				setSelectionState("select-first");
			}
		},
		[firstWord, lastWord, immutable]
	);

	if (immutable) action = () => null;

	const shouldHighlight = (i: number) =>  {
		if(firstWord === undefined && lastWord === undefined) return false;
		return i == firstWord || (i >= firstWord! && i <= lastWord!);
	}

	const wordArray = useMemo(() => paragraph.split(" "), [paragraph, firstWord, lastWord]);

	const dispatch = useDispatch();

	/**
	 * Show notification to user
	 */
	useEffect(() => {
		dispatch(clearNotifications());

		if (immutable) return;

		switch (selectionState) {
			case "select-first":
				dispatch(
					addNotificationItem({
						title: "Select the first word",
						text: "Tap the first character of an answer snippet that answers the question",
					})
				);
				break;
			case "select-last":
				dispatch(
					addNotificationItem({
						title: "Select the last word",
						text: "Tap the last character of an answer snippet that answers the question",
					})
				);
				break;
			case "clear-selection":
				dispatch(
					addNotificationItem({
						title: "Confirm the selection",
						text: "If you're happy with the selection, confirm to move on to the next step. You can tap the text to choose again.",
					})
				);
				break;
		}

		return () => {
			dispatch(clearNotifications());
		};
	}, [selectionState, immutable]);

	return (
		<View>
			<View style={styles.para}>
				{wordArray.map((word, i) => (
					<TouchableOpacity
						onPress={() => handleClick(i)}
						activeOpacity={1}
						key={word}
					>
						<Text
							style={shouldHighlight(i) ? {
								...styles.word,
								color: Colors.MapToDark["light-grey"],
								backgroundColor:  Colors.MapToDark.highlight
							} : {
								...styles.word,
								color: "#666",
							}}
						>
							{word}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default SpanSelector;
