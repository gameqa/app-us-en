import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Atoms } from "../../..";
import { User } from "../../../../declerations";
import { StoreState } from "../../../../reducers";
import * as Services from "../../../../services";
import styles from "./styles";

const UsersInfo = (user: User) => {

	const game = useSelector((state: StoreState) => state.game);
	const [ratioIncreased, setRatioIncreased] = useState(true);

	const BASE_RATIO = 0;

	const ratio = useMemo(() => {
		return (game.currentRound - 1) / game.totalRounds
	}, [
		game.currentRound, game.totalRounds
	]);

	useEffect(() => {

		if(ratioIncreased){
			setRatioIncreased(false);
			return;
		}

		const TIMEOUT_DELAY = 5000;

		setRatioIncreased(true);

		const t = setTimeout(() => {
			setRatioIncreased(false);
		}, TIMEOUT_DELAY);
		
		return () => clearTimeout(t);

	}, [ratio])
	
	const levelProgressStyles = ratioIncreased ? {
		color: Services.Colors.MapToDark['highlight'],
		fontWeight: '600'
	} : {};


	return (
		<View style={styles.outer}>
			{/* The avatar and level info */}
			<View style={styles.row}>
				<Atoms.Users.Avatar {...user} />
				<View
					style={[styles.fullWidth, styles.userLevelContainer]}
				>
					<View style={styles.nameStreakContainer}>
						<Atoms.Text.Heading style={styles.nameStyle}>
							{user.username}
						</Atoms.Text.Heading>
						{user.streak !== 1 ? (
							<Atoms.Text.Para style={styles.streakStyle}>
								🔥 {user.streak}
							</Atoms.Text.Para>
						) : null}
					</View>
					<Atoms.Text.Para>
						Lvl {user.level}{" "}
						{Services.UserLevels.mapLevelToString(user.level)}
					</Atoms.Text.Para>
					<Atoms.Text.Para>
						#{user.scoreCard.hiscoreRank} on the leaderboard
					</Atoms.Text.Para>
				</View>
			</View>
			{/* Level progress info */}
			<View style={styles.textOuter}>
				<Atoms.Text.Para style={levelProgressStyles}>
					
					Level Progress: {ratio < 0 || ratio == 1 ? 0 : Math.round(100 * ratio)}%
					{ratioIncreased ? " ⬆️" : ""}
				</Atoms.Text.Para>
				<View style={[styles.row, styles.alignCenter]}>
					<FontAwesome
						size={12}
						name="chevron-right"
						color={Services.Colors.MapToDark["warning"]}
					/>
					<FontAwesome
						size={12}
						name="chevron-right"
						color={Services.Colors.MapToDark["warning"]}
					/>
					<Atoms.Text.Para style={styles.nextLevel}>
						{Services.UserLevels.mapLevelToString(
							user.level + 1
						)}
					</Atoms.Text.Para>
				</View>
			</View>
			<Atoms.Charts.ProgressBar
				ratio={ratio <= 0 || ratio == 1 ? BASE_RATIO : ratio}
				label=""
				color="success"
			/>
		</View>
	);
};

export default UsersInfo;
